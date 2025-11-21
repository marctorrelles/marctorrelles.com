module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    })

    return config
  },
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
}
