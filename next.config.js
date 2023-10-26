import config from './app/config/config'
/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: config.cdnBaseUrl,
            },
            {
                protocol: 'http',
                hostname: config.host,
                port: config.port,
            },
        ],
    },
}

module.exports = nextConfig
