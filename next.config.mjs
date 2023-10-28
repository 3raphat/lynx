/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs')

/** @type {import("next").NextConfig} */
const config = {
  // rewrite /s/:key* to /:key*
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:key*',
  //       destination: '/s/:key*',
  //     },
  //   ]
  // },
}

export default config
