#!/bin/sh
# Cloudflare Pages build command.
# This is a static site with no real build step — the only thing this does
# is substitute the __GA_MEASUREMENT_ID__ placeholder in every HTML page
# with the GA_MEASUREMENT_ID environment variable, set in the Cloudflare
# Pages project settings (Settings → Environment variables).
set -eu
sed -i "s/__GA_MEASUREMENT_ID__/${GA_MEASUREMENT_ID}/g" \
  index.html en/index.html gizlilik-politikasi.html en/gizlilik-politikasi.html
