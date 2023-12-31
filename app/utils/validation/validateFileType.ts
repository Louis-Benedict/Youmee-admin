import { ALLOWED_FILE_TYPES_IMAGE } from '@/app/static/config'

export function validateFileTypeVideo(file: File) {
    console.log(file.type)
    return 'x'.includes(file.type)
}
export function validateFileTypeImage(file: File) {
    return ALLOWED_FILE_TYPES_IMAGE.includes(file.type)
}
