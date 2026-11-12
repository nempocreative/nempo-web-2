import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";
import { SECURITY_HEADERS } from "@/lib/security-policy";
import { shouldBlock } from "@/lib/hosting-lock";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const securityMiddleware = createMiddleware().server(async ({ next }) => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    setResponseHeader(name, value);
  }
  const result = await next();
  if (result instanceof Response) {
    const headers = new Headers(result.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
    return new Response(result.body, { status: result.status, statusText: result.statusText, headers });
  }
  return result;
});

const hostingLockMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;
  if (shouldBlock(host, url.pathname)) {
    return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain" } }) as never;
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [hostingLockMiddleware, securityMiddleware, errorMiddleware, csrfMiddleware],
}));
