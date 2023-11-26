import { Category } from '@prisma/client';
import { z } from 'zod';

/* Validation Schemas for Url-Parameter */
export const categorySchema = z.nativeEnum(Category);
export type CategorySchema = z.infer<typeof categorySchema>;

export type BrowseUrlSlugSchema = z.infer<typeof browseUrlSlugSchema>;
export const browseUrlSlugSchema = z.object({
	slug: z
		.tuple([
			z
				.preprocess((val) => String(val).toUpperCase(), categorySchema)
				.optional(),
		])
		.optional(),
});

export type ResetPasswordSlugSchema = z.infer<typeof resetPasswordSlugSchema>;
export const resetPasswordSlugSchema = z.object({
	slug: z
		.tuple([
			z
				.preprocess((val) => String(val).toUpperCase(), categorySchema)
				.optional(),
		])
		.optional(),
});

/* @CategorySelectPriceModal in Categores */
export type PriceRangeSelector = z.infer<typeof priceRangeSelector>;
export const priceRangeSelector = z
	.string()
	.refine((val) => val.includes('-'))
	.transform((val) => {
		let [lower, upper, ...rest] = val.split('-');
		return { lowerBound: lower, upperBound: upper };
	});
