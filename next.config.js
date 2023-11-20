/**
 * @format
 * @type {import('next').NextConfig}
 */

const s3Host = process.env.NEXT_PUBLIC_S3_URL
const cfHost = process.env.NEXT_PUBLIC_CF_URL
const host = process.env.HOST
const port = process.env.PORT
const protocol = process.env.PROTOCOL

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
                hostname: s3Host,
            },
            {
                protocol: 'https',
                hostname: cfHost,
            },
            {
                protocol: protocol,
                hostname: host,
                port: port,
            },
        ],
    },
}

module.exports = nextConfig
