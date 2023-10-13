'use client'

import { useCallback, useState } from 'react'
import { toast } from '@/app/components/ui/toast'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Icons from '@/app/libs/icons'
import { useRouter } from 'next/navigation'
import { toastMessages } from '@/app/static/toastMessages'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

import Modal from './Modal'
import Input from '../inputs/Input'
import Heading from '../ui/Heading'
import Button from '../ui/Button/BaseButton'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    UserLoginSchema,
    userLoginSchema,
} from '@/app/libs/validation/authValidation'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import PageInput from '../inputs/PageInput'

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginSchema>({
        resolver: zodResolver(userLoginSchema),
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false)

            if (callback?.error) {
                toast(toastMessages.loggedIn.error)
                router.refresh()
            } else {
                toast(toastMessages.loggedIn.success)
                router.refresh()
                loginModal.onClose()
            }
        })
    }

    const onToggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-8 mt-10">
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
      text-neutral-500 text-center text-sm  mt-4 "
            >
                <p>
                    <span
                        onClick={onToggle}
                        className="
						text-accent-dark
						font-semibold
						cursor-pointer 
						hover:underline
						"
                    >
                        Create an account
                    </span>
                    <span> / </span>
                    <Link
                        href="/reset-password"
                        className="
						text-accent-dark
						cursor-pointer 
						font-semibold
						hover:underline
						"
                    >
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal
