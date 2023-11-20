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
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'youmee-th.s3.ap-southeast-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'https://d1ljz7er88cmtt.cloudfront.net/',
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
