ALTER POLICY "Anyone can apply" ON public.community_applications
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(full_name)) BETWEEN 3 AND 100
    AND char_length(email) <= 255
    AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    AND char_length(whatsapp) BETWEEN 9 AND 16
    AND whatsapp ~ '^[0-9+[:space:]-]+$'
    AND interest IN ('Designer', 'Web Developer', 'Content Creator', 'Videografer dan Fotographer', 'Marketing', 'Event Management')
    AND origin_type IS NOT NULL
    AND origin_type IN ('Sekolah', 'Kuliah', 'Umum')
    AND char_length(coalesce(origin_name, '')) <= 150
    AND (origin_type = 'Umum' OR char_length(btrim(coalesce(origin_name, ''))) > 0)
    AND char_length(coalesce(hobby, '')) <= 200
    AND char_length(coalesce(reason, '')) <= 1000
  );

DROP POLICY "Public can read site_settings" ON public.site_settings;
REVOKE SELECT ON public.site_settings FROM anon;

ALTER POLICY "Public can read event_tickets" ON public.event_tickets
  TO anon, authenticated
  USING (
    active IS TRUE
    AND EXISTS (
      SELECT 1 FROM public.events AS event
      WHERE event.id = event_tickets.event_id AND event.active IS TRUE
    )
  );