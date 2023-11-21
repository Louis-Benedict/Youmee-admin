export function getConfig() {
    return {
        baseUrl: process.env.NEXT_PUBLIC_BASEURL!,
        apiBaseUrl:
            process.env.NEXT_PUBLIC_BASEURL! +
            process.env.NEXT_PUBLIC_API_BASEURL!,
        cdnBaseUrl: process.env.NEXT_PUBLIC_CF_URL!,
        s3BaseUrl: process.env.NEXT_PUBLIC_S3_URL!,
    }
}

export const config = getConfig()
