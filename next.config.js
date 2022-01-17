// eslint-disable-next-line no-undef
const withTM = require('next-transpile-modules')(['swiper', 'react-id-swiper']); // pass the modules you would like to see transpiled

// eslint-disable-next-line no-undef
module.exports = withTM({
  reactStrictMode: true,
  experimental: { esmExternals: true },
})
