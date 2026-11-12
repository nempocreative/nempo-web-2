CREATE OR REPLACE FUNCTION public.grant_allowlisted_admin()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND NEW.email IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.admin_allowlist WHERE email = lower(NEW.email)) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.grant_allowlisted_admin() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_auth_user_confirmed_grant_admin
AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_allowlisted_admin();