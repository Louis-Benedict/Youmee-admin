import {
    emailValidation,
    fullnameValidation,
    phoneValidation,
} from '@/app/libs/validation/authValidation'
import { z } from 'zod'

export type AddEnrolleeSchema = z.infer<typeof addEnrolleeSchema>
export const addEnrolleeSchema = z.object({
    fullname: fullnameValidation,
    country: z.string().min(2),
    email: emailValidation,
    alias: z.string().min(1).optional(),
    phoneNumber: phoneValidation,
    lineId: z.string().optional(),
    note: z.string().max(600).optional(),
    recruiterUserId: z.string().optional(),
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
