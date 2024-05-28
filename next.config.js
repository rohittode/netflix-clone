// /** @type {import('next').NextConfig} */

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['image.tmdb.org','rb.gy','www.notebookcheck.net','image.tmdb.org/t/p/original'],
//   },
// }

const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org','rb.gy','www.notebookcheck.net','image.tmdb.org/t/p/original'],
  },
})

rewrites: async () => [
  {
    source: "/public/search.html",
    destination: "/pages/api/search.js",
  },
]