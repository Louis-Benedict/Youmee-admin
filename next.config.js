/**
 * @format
 * @type {import('next').NextConfig}
 */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    compress: !isProd,
    compiler: {
        styledComponents: true,
    },
    eslint: {
        ignoreDuringBuilds: !isProd,
    },
    output: 'standalone',
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'youmee-th.s3.ap-southeast-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'd1ljz7er88cmtt.cloudfront.net',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                protocol: 'https',
                hostname: 'youmee.admin.co.th',
                port: '3000',
            },
        ],
    },
}

module.exports = nextConfig
