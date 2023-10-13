import { Category, UserRole } from '@prisma/client';
import { z } from 'zod';

export const roleSchema = z.nativeEnum(UserRole);
export const idSchema = z.string().length(24);

/* USER SCHEMA */
export type ClientUserSchema = z.infer<typeof clientUserSchema>;
export const clientUserSchema = z.object({
	id: idSchema,
	email: z.string().email(),
	name: z.string(),
	firstname: z.string().optional(),
	lastname: z.string().optional(),
	role: z.literal(UserRole.USER),
	phoneNumber: z.string().optional(),
	image: z.string(),
});

/* USER SCHEMA */
export type ClientCreatorSchema = z.infer<typeof clientCreatorSchema>;
export const clientCreatorSchema = z.object({
	id: idSchema,
	email: z.string().email(),
	name: z.string(),
	firstname: z.string().optional(),
	lastname: z.string().optional(),
	role: z.literal(UserRole.CREATOR),
	phoneNumber: z.string().optional(),
	image: z.string(),
	category: z.nativeEnum(Category),
	rate: z.number(),
	knownFor: z.string(),
	bio: z.string(),
});
/* USER SCHEMA */
export type ReviewSchema = z.infer<typeof reviewSchema>;
export const reviewSchema = z.object({
	// senderUserId: idSchema,
	orderId: idSchema.optional(),
	recipientUserId: idSchema,
	message: z.string().min(1),
	rating: z
		.number()
		.nonnegative()
		.refine((value) => value <= 5, { message: 'Cant be higher than 5.' })
		.default(5),
	publicizeConsent: z.boolean().default(false),
});
