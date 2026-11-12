CREATE TABLE public.yearbook_photo_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL DEFAULT '',
  caption text,
  storage_path text NOT NULL,
  mime_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.yearbook_photo_submissions TO authenticated;
GRANT ALL ON public.yearbook_photo_submissions TO service_role;
ALTER TABLE public.yearbook_photo_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage yearbook submissions" ON public.yearbook_photo_submissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));