/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/babel",
  assetPrefix: "/babel/",
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
