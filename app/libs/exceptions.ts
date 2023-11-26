import config from '@/app/libs/aws/s3/config'

export class FileTooLargeError extends Error {
    constructor(
        message = `Images cannot be larger than ${
            config.MAX_FILE_SIZE_VIDEO / 1000000
        }MB.`
    ) {
        super(message)
    }
}
