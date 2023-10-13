import { z } from 'zod'

/* These schemas are mainly used in Combination with React-Hook-Forms and 
   the zod-resolver extension. 
   @see 
*/

/*
 Definitions of often used validations
 */
export const nameValidation = z.string().min(1, { message: 'Name is required' })
export const fullnameValidation = z
    .string()
    .min(1, { message: 'Full name is required' })

export const passwordValidation = z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' })

export const emailValidation = z
    .string()
    .min(1, { message: 'Email is required' })
    .email({
        message: 'Must be a valid email',
    })
export const termsValidation = z.literal(true, {
    errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
})
export const marketingConsentValidation = z.literal(true).optional()

export const phoneValidation = z
    .string()
    .regex(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        { message: 'Not a valid phone number' }
    )

/*
Schema for Creator Login
 */
export type CreatorLoginSchema = z.infer<typeof creatorLoginSchema>
export const creatorLoginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
})

/*
Schema for /enroll
 */
export type EnrollAsCreatorSchema = z.infer<typeof enrollAsCreatorSchema>
export const enrollAsCreatorSchema = z.object({
    gender: z.string().nullable(),
    fullname: fullnameValidation,
    email: emailValidation,
    alias: z.string(),
    phoneNumber: phoneValidation,
    country: z.string().min(1, { message: 'Country is required' }),
    socialMediaHandle: z.string().min(1, { message: 'Handle is required' }),
    following: z.string().min(1, { message: 'Follwing is required' }),
    info: z.string(),
})

/*
Schema for LoginModal
 */
export type UserLoginSchema = z.infer<typeof userLoginSchema>
export const userLoginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
})

/*
Schema for RegisterModal
 */
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>
export const userRegisterSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: 'Must be longer' })
            .regex(/^[a-zA-Z0-9_]*$/),
        email: emailValidation,
        password: passwordValidation,
        retypedPassword: passwordValidation,
        // terms: termsValidation,
    })
    .refine(
        (schema) => {
            return schema.password === schema.retypedPassword
        },
        {
            message: 'Both passwords need to match',
            path: ['retypedPassword'],
        }
    )

/*
Schema for /enroll
 */
export type EnrollSchema = z.infer<typeof enrollSchema>
export const enrollSchema = z.object({
    fullname: fullnameValidation,
    country: z.string().min(2),
    email: emailValidation,
    alias: z.string().min(1).optional(),
    phoneNumber: phoneValidation,
    following: z.string(),
    lineId: z.string().optional(),
    socialMediaHandle: z.string().refine((value) => value.includes('@'), {
        message: 'Not a valid handle',
    }),
    additionalInformation: z.string().max(600),
})

export type ResetPasswordEmailSchema = z.infer<typeof resetPasswordEmailSchema>
export const resetPasswordEmailSchema = z.object({
    email: emailValidation,
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export const resetPasswordSchema = z
    .object({
        password: passwordValidation,
        retypedPassword: passwordValidation,
        token: z.string().min(10),
    })
    .refine(
        (schema) => {
            return schema.password === schema.retypedPassword
        },
        {
            message: 'Both passwords have to match',
            path: ['retypedPassword'],
        }
    )
