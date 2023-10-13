import { MAX_FILE_SIZE_IMAGE, MAX_FILE_SIZE_VIDEO } from './fileupload'

export const S3_PUB_CONTENT_BUCKET_NAME = 'youmee-s3'
export const S3_BUCKET_BASEURL =
    'https://youmee-th.s3.ap-southeast-1.amazonaws.com/'
export const CDN_URL = 'https://d1ljz7er88cmtt.cloudfront.net/'

export const signPostConfig = (key: String, type = 'video') => ({
    Bucket: S3_PUB_CONTENT_BUCKET_NAME,
    Fields: { key },
    Expires: 60,
    Conditions: [
        ['content-length-range', 0, MAX_FILE_SIZE_VIDEO],
        ['starts-with', '$Content-Type', `${type}/`],
    ],
})

export function concatUrl(key: string) {
    return (CDN_URL ?? S3_BUCKET_BASEURL) + key
}
