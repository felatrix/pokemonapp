// eslint-disable-next-line no-undef
const withTM = require('next-transpile-modules')(['swiper', 'react-id-swiper']); // pass the modules you would like to see transpiled

// eslint-disable-next-line no-undef
module.exports = withTM({
  reactStrictMode: true,
  experimental: { esmExternals: true },
  env:{
    // eslint-disable-next-line no-undef
    PUBLIC_URL:process.env.BASE_URL
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
})
