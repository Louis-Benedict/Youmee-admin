import { supportedTypes } from '../components/media/config';

//MEDIA VARIABLES
export const ACCEPTED_VIDEO_MIMETYPES = 'video/webm';
export const ALLOWED_FILE_TYPES_VIDEO = supportedTypes;
export const ALLOWED_FILE_TYPES_IMAGE = ['image/png', 'image/jpeg'];

//CREATOR CALCULATIONS
export const CATEGORIES_PAGINATION_TAKE = 5;
export const CREATOR_SHARE_MULTIPLIER = 0.7;
export const CREATOR_24H_PREMIUM_MULTIPLIER = 0.5;
export const CREATOR_CALCULATE_24H_PREMIUM = (
	rate: string | number | null | undefined
) => {
	if (rate) {
		return CREATOR_24H_PREMIUM_MULTIPLIER * +rate;
	} else throw new Error('SERIOUS!: Unable to calculate rate for creator');
};
