import {
    emailValidation,
    fullnameValidation,
    phoneValidation,
} from '@/app/libs/validation/authValidation'
import { z } from 'zod'

export type AddEnrolleeSchema = z.infer<typeof addEnrolleeSchema>
export const addEnrolleeSchema = z
    .object({
        fullname: fullnameValidation,
        country: z.string().min(2),
        email: emailValidation,
        alias: z.string().min(1).optional(),
        phoneNumber: phoneValidation,
        lineId: z.string().optional(),
        note: z.string().max(600).optional(),
        recruiterUserId: z.string().optional(),
        instagramHandle: z.string().optional(),
        instagramFollowers: z.string().optional(),
        facebookHandle: z.string().optional(),
        facebookFollowers: z.string().optional(),
        youtubeHandle: z.string().optional(),
        youtubeFollowers: z.string().optional(),
        tiktokHandle: z.string().optional(),
        tiktokFollowers: z.string().optional(),
    })
    .superRefine((form, ctx) => {
        if (!!form.instagramFollowers !== !!form.instagramHandle) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Both fields are required',
                path: ['instagramHandle'],
            })
        }
        if (!!form.facebookHandle !== !!form.facebookFollowers) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Both fields are required',
                path: ['facebookHandle'],
            })
        }
        if (!!form.tiktokFollowers !== !!form.tiktokHandle) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Both fields are required',
                path: ['tiktokHandle'],
            })
        }
        if (!!form.youtubeFollowers !== !!form.youtubeHandle) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Both fields are required',
                path: ['youtubeHandle'],
            })
        }
    })

export type EditEnrolleeSchema = z.infer<typeof editEnrolleeSchema>
export const editEnrolleeSchema = z.object({
    id: z.string(),
    fullname: fullnameValidation,
    country: z.string().min(2),
    email: emailValidation,
    alias: z.string().min(1).optional(),
    phoneNumber: phoneValidation,
    lineId: z.string().optional(),
    note: z.string().max(600).optional(),
    recruiterUserId: z.string().optional(),
})
