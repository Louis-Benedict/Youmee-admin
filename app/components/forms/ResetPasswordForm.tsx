'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { toastMessages } from '@/app/static/toastMessages'
import {
    ResetPasswordSchema,
    resetPasswordSchema,
} from '@/app/libs/validation/authValidation'

import { cn } from '@/app/libs/util'
import { Check } from 'lucide-react'
import PageInput from '../inputs/PageInput'
import { toast } from '../ui/toast'
import Heading from '../ui/Heading'
import Spacer from '../ui/Spacer'
import { Button } from '@radix-ui/themes'

interface ResetPasswordFormProps {
    token: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ResetPasswordSchema>({
        defaultValues: { token: token },
        resolver: zodResolver(resetPasswordSchema),
    })

    const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
        setIsLoading(true)
        axios
            .put('/api/v1/reset-password', data)
            .catch(() => {
                toast(toastMessages.requestSent.error)
            })
            .finally(() => {
                setIsLoading(false)
                setIsSubmitted(true)
            })
    }
    return (
        <>
            <Spacer />
            <div className="dark:text-white text-primary-dark flex flex-col w-full h-full gap-8 mt-10 bg-white max-w-[400px] p-6 mx-auto rounded-md ">
                <Heading
                    title="Set your password"
                    subtitle="After setting your password you will be redirected to login"
                />

                <div className="flex flex-col gap-4 items-center w-full ">
                    <div className="my-2 flex flex-col gap-8 w-full">
                        <PageInput
                            id="password"
                            label="Password"
                            type="password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <PageInput
                            id="retypedPassword"
                            label="Enter password again"
                            type="password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>

                    <Button
                        className="w-full h-10"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Confirm
                    </Button>
                    <div
                        className={cn(
                            isSubmitted
                                ? 'h-10 opacity-100 p-2'
                                : 'h-0 opacity-0',
                            'transition-all duration-300 ease-in-out text-xs  text-center w-full rounded-md'
                        )}
                    >
                        <div className="flex gap-2">
                            <Check size={20} className="text-green-500" />
                            Password has been reset
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordForm
