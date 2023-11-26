import { toast } from 'react-hot-toast'
import { FileTooLargeError } from '../libs/exceptions'
import { s3ResponseSchema } from '../utils/validation/s3'
import config from '../libs/aws/s3/config'

interface UseS3UploadReturn {
    s3Upload: (
        file: File
    ) => Promise<{ getUrl: string | null; key: string | null }>
}

const uploadFile = async (file: File) => {
    try {
        const res = await fetch('/api/user/upload/video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileType: file.type }),
        })

        const data = await res.json()

        const { key, fields, getUrl, postUrl } = s3ResponseSchema.parse(data)

        const outboundToS3 = {
            ...fields,
            'Content-Type': file.type,
            file,
        }

        const formData = new FormData()

        Object.entries(outboundToS3).forEach(([key, value]) => {
            formData.append(key, value)
        })

        await uploadResourceToS3(postUrl, formData)

        return { getUrl, key }
    } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error')
    }
}

const uploadResourceToS3 = async (postUrl: string, formData: FormData) => {
    await fetch(postUrl, {
        method: 'POST',
        body: formData,
    })
}

// const requestDbEntry = async (key: string, targetOrderId: string) => {
// await axios.post('/api/clip', { key: key }).then(async (result) => {
// 	await axios.post('/api/order/update', {
// 		targetOrderId: targetOrderId,
// 		clipId: result.data.id,
// 	});
// });
// };

// const saveDbAndUploadS3 = async (
// postUrl: string,
// targetOrderId: string,
// formdata: FormData,
// key: string
// ) => {
// return await Promise.all([
// 	uploadResourceToS3(postUrl, formdata),
// 	requestDbEntry(key, targetOrderId),
// ]).catch((error) => {
// 	console.log(error);
// });
// };

export const useS3VideoUpload = (): UseS3UploadReturn => {
    const s3Upload = async (file: File) => {
        try {
            if (file.size > config.MAX_FILE_SIZE_VIDEO)
                throw new FileTooLargeError()

            const { getUrl, key } = await uploadFile(file)

            return { getUrl, key }
        } catch (error) {
            if (error instanceof FileTooLargeError) {
                toast.error('File too big')
                return { getUrl: null, key: null }
            }
            console.log(error)
            toast.error('There was an error uploading your image.')

            return { getUrl: null, key: null }
        }
    }

    return { s3Upload }
}
