'use client'

import PageInput from '@/app/components/inputs/PageInput'
import {
    UserLoginSchema,
    userLoginSchema,
} from '@/app/libs/validation/authValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@radix-ui/themes'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)

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
            callbackUrl: '/enrollees',
        }).then((callback) => {
            setIsLoading(false)
        })
    }

    return (
        <div className="relative w-full h-full bg-gradient-to-r from-indigo-100  to-pink-100 bg-opacity-20">
            <div className="transition-all duration-300 ease-in-out justify-center items-center flex overflow-x-hidden translate-x-0 opacity-100 overflow-y-auto fixed inset-0 z-[30] outline-none focus:outline-none dark:text-white h-full text-primary-dark">
                <div className="flex flex-col gap-8 min-w-[300px] p-4 rounded-md bg-white">
                    <div className="mb-4 w-fit mx-auto">
                        <Image
                            width={100}
                            height={100}
                            alt="youmee admin logo"
                            src="/images/Youmee_Admin.png"
                        />
                    </div>
                    <PageInput
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <PageInput
                        id="password"
                        label="Password"
                        type="password"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        className="w-full h-10"
                    >
                        <LogIn size={20} />
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
