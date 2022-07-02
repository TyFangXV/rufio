/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exclude : ["external"],
  images : {
    domains : ["avatars.githubusercontent.com"]
  }
}

module.exports = nextConfig
