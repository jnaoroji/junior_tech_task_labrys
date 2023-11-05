// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
  
// }

// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig