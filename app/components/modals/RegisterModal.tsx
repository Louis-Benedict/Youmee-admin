'use client'

import axios from 'axios'
import { Icons } from '@/app/libs/icons'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../ui/Heading'
import Input from '../inputs/Input'

import Button from '../ui/Button/BaseButton'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    UserRegisterSchema,
    userRegisterSchema,
} from '@/app/libs/validation/authValidation'
import { toastMessages } from '@/app/static/toastMessages'
import { toast } from '../ui/toast'
import { useRouter } from 'next/navigation'
import { FaFacebook } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const RegisterModal = ({}) => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterSchema>({
        resolver: zodResolver(userRegisterSchema),
    })

    const onSubmit: SubmitHandler<UserRegisterSchema> = (data) => {
        setIsLoading(true)
        axios
            .post('/api/register', data)
            .then(() => {
                toast(toastMessages.register.success)
                router.push('/verify-email')
                registerModal.onClose()
            })
            .catch(() => {
                toast(toastMessages.register.error)
            })
        setIsLoading(false)
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Youmee" subtitle="Create an account" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="retypedPassword"
                label="Confirm Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button
                outline
                label="Continue with Google"
                icon={Icons.FaGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Facebook"
                icon={FaFacebook}
                onClick={() => signIn('facebook')}
            />
            <div
                className="
				text-neutral-500
				text-center
				mt-4
				font-light
			"
            >
                <div className="text-xs text-neutral-500">
                    By registering I agree to the terms and conditions of Youmee
                </div>
                <div className="justify-center text-sm flex flex-row items-center gap-2">
                    <div>Already have an account?</div>
                    <div
                        onClick={registerModal.onClose}
                        className=" cursor-pointer hover:underline text-accent-dark"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            actionLabel="Continue"
            title="Register"
            body={bodyContent}
            footer={footerContent}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterModal
