'use client'

import FormInput from '@/app/components/inputs/FormInput'
import { useRouter } from 'next/navigation'
import {
    UserLoginSchema,
    userLoginSchema,
} from '@/app/utils/validation/authValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text } from '@radix-ui/themes'
import { Loader2, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginSchema>({
        resolver: zodResolver(userLoginSchema),
    })

    const onSubmit: SubmitHandler<UserLoginSchema> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            if (callback?.error) {
                setError(callback.error)
            }
            router.refresh()
        })
        setIsLoading(false)
    }

    return (
        <div className="relative w-full h-full bg-gradient-to-r from-indigo-100  to-pink-100 bg-opacity-20">
            <div className="transition-all duration-300 ease-in-out justify-center items-center flex overflow-x-hidden translate-x-0 opacity-100 overflow-y-auto fixed inset-0 z-[30] outline-none focus:outline-none dark:text-white h-full text-primary-dark">
                <div className="flex flex-col gap-2 min-w-[300px] p-4 rounded-md bg-white">
                    <div className="mb-4 w-fit mx-auto">
                        <Image
                            width={100}
                            height={100}
                            alt="youmee admin logo"
                            src="/images/Youmee_Admin.png"
                        />
                    </div>
                    <FormInput
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        testid="email-input"
                        required
                    />
                    <FormInput
                        id="password"
                        label="Password"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        testid="password-input"
                        required
                    />
                    <Text color="red" size="1">
                        {error}
                    </Text>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-10 mt-4"
                        data-testid="login-button"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <LogIn size={20} />
                        )}
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
