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
                hostname: 'd1ljz7er88cmtt.cloudfront.net',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
    },
}

module.exports = nextConfig
