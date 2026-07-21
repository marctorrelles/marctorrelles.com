import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Static assets cache: serve build-time prerendered (SSG) pages straight from
// the Workers ASSETS binding. No on-demand revalidation on this site.
export default defineCloudflareConfig({
  incrementalCache,
})
