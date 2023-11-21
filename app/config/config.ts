export function getConfig() {
    return Object.freeze({
        baseUrl: process.env.NEXT_PUBLIC_BASEURL!,
        apiBaseUrl:
            process.env.NEXT_PUBLIC_BASEURL! +
            process.env.NEXT_PUBLIC_API_BASEURL!,
        cdnBaseUrl: process.env.NEXT_PUBLIC_CF_URL!,
        s3BaseUrl: process.env.NEXT_PUBLIC_S3_URL!,
        emailAddress: process.env.EMAIL_SENDER,
    })
}

export const config = getConfig()
