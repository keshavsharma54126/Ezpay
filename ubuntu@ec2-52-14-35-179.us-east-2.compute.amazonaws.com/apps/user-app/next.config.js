/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });
    return config;
  },
};
