-- Visitors get only what the site needs; RLS still applies on top.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT ON public.banners, public.digital_services, public.events, public.influencers,
  public.kamus_sunda, public.kuliner, public.partners, public.penginapan, public.perlombaan,
  public.price_list, public.promo_banners, public.site_settings, public.talents,
  public.transportasi, public.vouchers, public.wisata, public.event_tickets TO anon;
GRANT SELECT (id, title, slug, summary, content, image, category, author, source_name, source_url,
  photo_source, location, event_date, published_at, featured, active, status, created_at, updated_at)
  ON public.berita TO anon;
GRANT INSERT ON public.community_applications TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon;