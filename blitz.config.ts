import { BlitzConfig } from "blitz"

const config: BlitzConfig = {
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.woff/,
      use: [
        {
          loader: "url-loader",
        },
      ],
    })

    return config
  },
}
module.exports = config
