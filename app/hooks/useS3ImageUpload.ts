import { toast } from 'react-hot-toast'
import { MAX_FILE_SIZE_IMAGE } from '@/app/config/fileupload'
import { FileTooLargeError } from '../libs/exceptions'
import { s3ResponseSchema } from '../utils/validation/s3'

interface UseS3UploadReturn {
    s3Upload: (
        file: File
    ) => Promise<{ getUrl: string | null; key: any; error: boolean }>
}

const uploadFile = async (file: File) => {
    try {
        const res = await fetch('/api/presign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileType: file.type,
            }),
        })

        const data = await res.json()
        console.log('DATA: ' + data)

        const { fields, getUrl, postUrl, key } = s3ResponseSchema.parse(data)

        const outboundToS3 = {
            ...fields,
            'Content-Type': file.type,
            file,
        }

        const formData = new FormData()

        Object.entries(outboundToS3).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            await fetch(postUrl, {
                method: 'POST',
                body: formData,
            })
        } catch (error) {
            console.log(error)
            throw new FileTooLargeError()
        }

        return { getUrl, key }
    } catch (error) {
        if (error instanceof FileTooLargeError) {
            console.log(error)
            throw new FileTooLargeError()
        }
        console.log(error)

        throw new Error('Internal Server Error')
    }
}

export const useS3ImageUpload = (): UseS3UploadReturn => {
    const s3Upload = async (file: File) => {
        try {
            if (file.size > MAX_FILE_SIZE_IMAGE) throw new FileTooLargeError()

            const singleFile = file as File
            const { getUrl, key } = await uploadFile(singleFile)

            return { getUrl, key, error: false }
        } catch (error) {
            if (error instanceof FileTooLargeError) {
                toast.error('File too big')
                console.log(error)

                return { getUrl: null, key: null, error: true }
            }

            console.log(error)
            toast.error('There was an error uploading your image.')

            return { getUrl: null, key: null, error: true }
        }
    }

    return { s3Upload }
}
