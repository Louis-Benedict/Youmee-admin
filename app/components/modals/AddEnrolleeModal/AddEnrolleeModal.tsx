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
import { IconButton } from '@radix-ui/themes'
import { UserPlus } from 'lucide-react'

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
        defaultValues: {
            recruiterUserId: addEnrolleeModal.currentUserId,
            country: 'Thailand',
        },
    })

    useEffect(() => {
        reset({ recruiterUserId: addEnrolleeModal.currentUserId })
    }, [addEnrolleeModal.currentUserId])

    const onSubmit: SubmitHandler<AddEnrolleeSchema> = (data) => {
        addEnrollee(
            { ...(data as any) },
            { onSuccess: addEnrolleeModal.onClose }
        )
    }

    const bodyContent = (
        <div className="flex flex-col mt-4 gap-2">
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
                register={register}
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
            {/* <BirthdayInput id="birthday" register={register} errors={errors} /> */}
            {/* <DropdownInput
                data={['Instagram', 'Facebook', 'TikTok', 'You']}
                defaultValue="Thailand"
                label="Country"
                id="country"
                register={register}
                errors={errors}
                isLoading={adding}
            /> */}
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
    )

    const trigger = (
        <IconButton>
            <UserPlus />
        </IconButton>
    )

    return (
        <RModal
            isOpen={addEnrolleeModal.isOpen}
            onOpenChange={() => {}}
            triggerElement={trigger}
            isLoading={adding}
            disabled={adding}
            title="Add Enrollee"
            subtitle=" New enrollees will be sent an email that activates their account"
            body={bodyContent}
            secondaryActionLabel="Cancel"
            secondaryAction={() => {}}
            primaryActionLabel="Submit"
            primaryAction={handleSubmit(onSubmit)}
        />
    )
}

export default AddEnrolleeModal
