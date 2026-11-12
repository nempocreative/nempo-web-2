import { describe, expect, it } from "vitest";
import {
  installInspectGuard,
  isInspectGuardDisabled,
  shouldBlockContextMenu,
  shouldBlockInspectKey,
} from "./inspect-guard";

const none = { ctrlKey: false, metaKey: false, shiftKey: false };
const ctrl = { ctrlKey: true, metaKey: false, shiftKey: false };
const ctrlShift = { ctrlKey: true, metaKey: false, shiftKey: true };

describe("inspect guard", () => {
  it("blocks DevTools, view-source and save-page shortcuts", () => {
    expect(shouldBlockInspectKey("F12", none)).toBe(true);
    expect(shouldBlockInspectKey("I", ctrlShift)).toBe(true);
    expect(shouldBlockInspectKey("J", ctrlShift)).toBe(true);
    expect(shouldBlockInspectKey("C", ctrlShift)).toBe(true);
    expect(shouldBlockInspectKey("u", ctrl)).toBe(true);
    expect(shouldBlockInspectKey("S", ctrl)).toBe(true);
  });

  it("leaves normal typing and ordinary shortcuts alone", () => {
    expect(shouldBlockInspectKey("u", none)).toBe(false);
    expect(shouldBlockInspectKey("i", ctrl)).toBe(false);
    expect(shouldBlockInspectKey("F5", none)).toBe(false);
    expect(shouldBlockInspectKey("r", ctrlShift)).toBe(false);
    expect(shouldBlockInspectKey("a", ctrl)).toBe(false);
  });

  it("keeps the native menu inside editing fields only", () => {
    const field = document.createElement("input");
    const note = document.createElement("textarea");
    const content = document.createElement("div");
    content.setAttribute("contenteditable", "true");
    const photo = document.createElement("img");
    const page = document.createElement("section");
    page.appendChild(photo);

    expect(shouldBlockContextMenu(field)).toBe(false);
    expect(shouldBlockContextMenu(note)).toBe(false);
    expect(shouldBlockContextMenu(content)).toBe(false);
    expect(shouldBlockContextMenu(photo)).toBe(true);
    expect(shouldBlockContextMenu(page)).toBe(true);
    expect(shouldBlockContextMenu(null)).toBe(true);
  });

  it("is active on every host, including the Lovable preview", () => {
    expect(isInspectGuardDisabled("id-preview--abc.lovable.app")).toBe(false);
    expect(isInspectGuardDisabled("nempo.lovable.app")).toBe(false);
    expect(isInspectGuardDisabled("nempogarut.com")).toBe(false);
    expect(isInspectGuardDisabled("www.nempogarut.com")).toBe(false);
    expect(isInspectGuardDisabled("my-app.vercel.app")).toBe(false);
    expect(isInspectGuardDisabled("localhost")).toBe(false);
  });
});

describe("inspect guard wiring", () => {
  it("blocks right-click, DevTools keys and photo drags once installed", () => {
    const cleanup = installInspectGuard("nempogarut.com");

    const menu = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(menu);
    expect(menu.defaultPrevented).toBe(true);

    const field = document.createElement("input");
    document.body.appendChild(field);
    const inField = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    field.dispatchEvent(inField);
    expect(inField.defaultPrevented).toBe(false);
    field.remove();

    const devtools = new KeyboardEvent("keydown", { key: "F12", cancelable: true });
    window.dispatchEvent(devtools);
    expect(devtools.defaultPrevented).toBe(true);

    const typed = new KeyboardEvent("keydown", { key: "u", cancelable: true });
    window.dispatchEvent(typed);
    expect(typed.defaultPrevented).toBe(false);

    const photo = document.createElement("img");
    document.body.appendChild(photo);
    const drag = new Event("dragstart", { bubbles: true, cancelable: true });
    photo.dispatchEvent(drag);
    expect(drag.defaultPrevented).toBe(true);
    photo.remove();

    cleanup();

    const afterMenu = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(afterMenu);
    expect(afterMenu.defaultPrevented).toBe(false);
    const afterKey = new KeyboardEvent("keydown", { key: "F12", cancelable: true });
    window.dispatchEvent(afterKey);
    expect(afterKey.defaultPrevented).toBe(false);
  });

  it("blocks right-click on the Lovable preview host too", () => {
    const cleanup = installInspectGuard("id-preview--abc.lovable.app");
    const menu = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    document.body.dispatchEvent(menu);
    expect(menu.defaultPrevented).toBe(true);
    cleanup();
  });
});
