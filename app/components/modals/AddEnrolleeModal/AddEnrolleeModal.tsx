'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAddEnrolleeModal from './useEnrolleeModal'
import TextArea from '@/app/components/inputs/TextArea'
import { countries } from '@/app/static/countries'
import DropdownInput from '@/app/components/inputs/CountryInput'
import {
    AddEnrolleeSchema,
    addEnrolleeSchema,
} from '@/app/(dashboard)/enrollees/validation'
import { useEffect } from 'react'
import { useAddEnrollee } from '@/app/(dashboard)/enrollees/queries'
import FormInput from '../../inputs/FormInput'
import RModal from '../RModal'
import { Box, Heading } from '@radix-ui/themes'
import { Globe, User } from 'lucide-react'
import FollowerCountInput from '../../inputs/FollowerCountInput'

const AddEnrolleeModal = () => {
    const addEnrolleeModal = useAddEnrolleeModal()
    const { mutate: addEnrollee, isLoading: adding } = useAddEnrollee()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<AddEnrolleeSchema>({
        resolver: zodResolver(addEnrolleeSchema),
    })

    useEffect(() => {
        reset({
            recruiterUserId: addEnrolleeModal.currentUserId,
        })
    }, [addEnrolleeModal.currentUserId])

    const onSubmit: SubmitHandler<AddEnrolleeSchema> = (data) => {
        addEnrollee(
            { ...(data as any) },
            { onSuccess: addEnrolleeModal.onClose }
        )
    }

    const bodyContent = (
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
                />
                <FormInput
                    id="phoneNumber"
                    label="Phone number"
                    register={register}
                    errors={errors}
                />
                <FormInput
                    id="email"
                    label="Email"
                    register={register}
                    errors={errors}
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
                />
                <FormInput
                    id="lineId"
                    label="Line ID"
                    register={register}
                    errors={errors}
                />
                <TextArea
                    id="note"
                    label="Note"
                    register={register}
                    errors={errors}
                    placeholder="Write a note"
                />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
                <Heading size="2" className="mb-2">
                    <Globe size={16} className="inline mr-1" />
                    Social Media
                </Heading>
                <Box className="border-[1px]  rounded-md p-4">
                    <FormInput
                        id="instagramHandle"
                        label="Instagram Handle"
                        register={register}
                        errors={errors}
                    />
                    <FollowerCountInput
                        id="instagramFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px]  rounded-md p-4">
                    <FormInput
                        id="youtubeHandle"
                        label="Youtube Handle"
                        register={register}
                        errors={errors}
                    />
                    <FollowerCountInput
                        id="youtubeFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px]  rounded-md p-4">
                    <FormInput
                        id="tiktokHandle"
                        label="TikTok Handle"
                        register={register}
                        errors={errors}
                    />
                    <FollowerCountInput
                        id="tiktokFollowers"
                        control={control}
                        errors={errors}
                    />
                </Box>

                <Box className="border-[1px]  rounded-md p-4">
                    <FormInput
                        id="facebookHandle"
                        label="Facebook Handle"
                        register={register}
                        errors={errors}
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

    return (
        <RModal
            isOpen={addEnrolleeModal.isOpen}
            onOpenChange={() => {}}
            isLoading={adding}
            disabled={adding}
            title="Add Enrollee"
            subtitle=" New enrollees will be sent an email that activates their account"
            body={bodyContent}
            secondaryActionLabel="Cancel"
            secondaryAction={addEnrolleeModal.onClose}
            primaryActionLabel="Submit"
            primaryAction={handleSubmit(onSubmit)}
        />
    )
}

export default AddEnrolleeModal
