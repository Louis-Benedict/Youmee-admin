export function getConfig() {
    return {
        baseUrl: process.env.NEXT_PUBLIC_BASEURL!,
        apiBaseUrl: '/api/v1',
        cdnBaseUrl: process.env.NEXT_PUBLIC_CF_URL!,
        s3BaseUrl: process.env.NEXT_PUBLIC_S3_URL!,
        emailAddress: process.env.NEXT_PUBLIC_EMAIL_SENDER!,
    }
}

export const config = getConfig()
