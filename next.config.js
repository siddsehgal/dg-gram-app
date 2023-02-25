/** @type {import('next').NextConfig} */

// const webpack = (config) => {
//   config.experiments = {
//     topLevelAwait: true,
//   };

//   return config;
// };
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};

module.exports = nextConfig;
