'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextArea from '@/app/components/inputs/TextArea'
import { countries } from '@/app/static/countries'
import DropdownInput from '@/app/components/inputs/DropdownInput'
import {
    AddEnrolleeSchema,
    addEnrolleeSchema,
} from '@/app/(dashboard)/enrollees/validation'
import { useAddEnrollee } from '@/app/(dashboard)/enrollees/queries'
import FormInput from '../../inputs/FormInput'
import { Box, Heading } from '@radix-ui/themes'
import { Facebook, Globe, Instagram, User, Youtube } from 'lucide-react'
import FollowerCountInput from '../../inputs/FollowerCountInput'
import { FaTiktok } from 'react-icons/fa'
import useAddEnrolleeModal from './useEnrolleeModal'
import { Enrollee } from '@prisma/client'

export type FormHandle = {
    submit: VoidFunction
}

const AddEnrolleeForm = forwardRef<FormHandle, unknown>((_, ref) => {
    const onClose = useAddEnrolleeModal((state) => state.onClose)
    const recruiterId = useAddEnrolleeModal((state) => state.currentUserId)
    const { mutate: addEnrollee, isLoading: adding } = useAddEnrollee()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<AddEnrolleeSchema>({
        resolver: zodResolver(addEnrolleeSchema),
    })

    const onSubmit: SubmitHandler<AddEnrolleeSchema> = (data) => {
        setValue('recruiterUserId', recruiterId)
        addEnrollee({ ...(data as Enrollee) }, { onSuccess: onClose })
        reset()
    }

    useImperativeHandle(ref, () => ({ submit: handleSubmit(onSubmit) }))

    return (
        <div className="flex gap-12 px-2 mt-4">
            <div className="w-1/2 flex flex-col gap-2">
                <Heading size="2" className="mb-2">
                    <User className="inline mr-1" size={18} />
                    Personal Information
                </Heading>
                <FormInput
                    id="fullname"
                    label="Name"
                    register={register}
                    errors={errors}
                    testid="name-input"
                />
                <FormInput
                    id="phoneNumber"
                    label="Phone number"
                    register={register}
                    errors={errors}
                    testid="phone-input"
                />
                <FormInput
                    id="email"
                    label="Email"
                    register={register}
                    errors={errors}
                    testid="email-input"
                />
                <DropdownInput
                    data={countries}
                    defaultValue="Thailand"
                    label="Country"
                    id="country"
                    errors={errors}
                    isLoading={adding}
                    control={control}
                />
                <FormInput
                    id="alias"
                    label="Alias"
                    register={register}
                    errors={errors}
                    testid="alias-input"
                />
                <FormInput
                    id="lineId"
                    label="Line ID"
                    register={register}
                    errors={errors}
                    testid="line-input"
                />
                <TextArea
                    id="note"
                    label="Note"
                    register={register}
                    errors={errors}
                    placeholder="Write a note"
                    data-testid="note-textarea"
                />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
                <Heading size="2" className="mb-2">
                    <Globe size={16} className="inline mr-1" />
                    Social Media
                </Heading>
                <Box className="border-[1px] relative rounded-md px-4 pt-5 pb-3">
                    <div className="absolute top-2 right-2">
                        <Instagram size={14} />
                    </div>
                    <FormInput
                        id="instagramHandle"
                        label="Instagram Handle"
                        register={register}
                        errors={errors}
                        testid="instagram-input"
                    />
                    <FollowerCountInput
                        id="instagramFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px] relative rounded-md px-4 pt-5 pb-3">
                    <div className="absolute top-2 right-2">
                        <Youtube size={14} />
                    </div>
                    <FormInput
                        id="youtubeHandle"
                        label="Youtube Handle"
                        register={register}
                        errors={errors}
                        testid="youtube-input"
                    />
                    <FollowerCountInput
                        id="youtubeFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px] relative rounded-md px-4 pt-5 pb-3">
                    <div className="absolute top-2 right-2">
                        <FaTiktok size={12} />
                    </div>
                    <FormInput
                        id="tiktokHandle"
                        label="TikTok Handle"
                        register={register}
                        errors={errors}
                        testid="tiktok-input"
                    />
                    <FollowerCountInput
                        id="tiktokFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px] relative rounded-md px-4 pt-5 pb-3">
                    <div className="absolute top-2 right-2">
                        <Facebook size={14} />
                    </div>
                    <FormInput
                        id="facebookHandle"
                        label="Facebook Handle"
                        register={register}
                        errors={errors}
                        testid="facebook-input"
                    />
                    <FollowerCountInput
                        id="facebookFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>
            </div>
        </div>
    )
})

AddEnrolleeForm.displayName = 'AddEnrolleeForm'
export default AddEnrolleeForm
