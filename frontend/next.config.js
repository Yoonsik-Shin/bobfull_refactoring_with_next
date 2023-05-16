/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig: {
    reactStrictMode: false,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
