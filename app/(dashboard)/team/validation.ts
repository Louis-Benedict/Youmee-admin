import {
    emailValidation,
    passwordValidation,
    phoneValidation,
} from '@/app/libs/validation/authValidation'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

export type TeamMemberSchema = z.infer<typeof teamMemberSchema>
export const teamMemberSchema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: 'Must be longer' }),
    email: emailValidation,
    image: z.string().nullish(),
    phoneNumber: phoneValidation,
    lineId: z.string(),
    password: passwordValidation,
    role: z.nativeEnum(UserRole),
    commissionPercentage: z
        .number()
        .nonnegative({ message: 'Negative numbers are not allowed' })
        .max(50)
        .optional(),
})

export type TeamMemberEditSchema = z.infer<typeof teamMemberEditSchema>
export const teamMemberEditSchema = teamMemberSchema.omit({
    password: true,
    email: true,
})

export type TeamMemberAddSchema = z.infer<typeof teamMemberEditSchema>
export const teamMemberAddSchema = teamMemberSchema.omit({
    id: true,
})
// .refine((val) => {
//     console.log(val)
//     return !(val.role === UserRole.RECRUITER && !val.commissionPercentage)
// })
