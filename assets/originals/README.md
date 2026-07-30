# Original full-resolution images

Untouched originals of the site photos that were downscaled for the web.

The files under `public/brochurephotos/` were camera and scanner originals — up
to 6000px wide and ~2 MB each. `next/image` downscales on request, so visitors
never downloaded them at full size, but every new size variant had to decode the
full-resolution source, which made first requests slow and memory-hungry.

The served copies are now capped at **2000px wide** (WebP, quality 82) — still
enough for a full-bleed retina hero. That took the 24 affected files from
17.1 MB to 6.6 MB.

The originals live here, mirroring their `public/` paths. This directory sits
outside `public/`, so nothing here is served or deployed — it exists so the
full-resolution masters are never lost (e.g. for print or a brochure reprint).

To restore one, copy it back over its counterpart in `public/`.
