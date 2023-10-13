import { MAX_FILE_SIZE_VIDEO } from '../config/fileupload'

export class FileTooLargeError extends Error {
	constructor(
		message = `Images cannot be larger than ${MAX_FILE_SIZE_VIDEO / 1000000}MB.`
	) {
		super(message)
	}
}
