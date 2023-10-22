'use client'

import RModal from '../RModal'
import FormInput from '../../inputs/FormInput'
import DropdownInput from '../../inputs/DropdownInput'
import useAddTeamMemberModal from './useTeamMemberModal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { useAddTeamMember } from '@/app/(dashboard)/team/queries'
import {
    TeamMemberAddSchema,
    teamMemberAddSchema,
} from '@/app/(dashboard)/team/validation'

const AddTeamMemberModal = () => {
    const { onClose, isOpen } = useAddTeamMemberModal()
    const addTeamMember = useAddTeamMember()

    const {
        watch,
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeamMemberAddSchema>({
        resolver: zodResolver(teamMemberAddSchema),
        defaultValues: {
            role: UserRole.RECRUITER,
        },
    })

    const onSubmit: SubmitHandler<TeamMemberAddSchema> = (data) => {
        addTeamMember.mutate(
            { ...(data as any) },
            {
                onSuccess: () => {
                    onClose()
                    reset()
                },
            }
        )
    }

    const role = watch('role')

    const bodyContent = (
        <div className="flex flex-col mt-4 gap-2">
            <FormInput
                id="name"
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
            <FormInput
                id="lineId"
                label="Line ID"
                register={register}
                errors={errors}
                testid="line-input"
            />

            <DropdownInput
                control={control}
                errors={errors}
                isLoading={false}
                id="role"
                label="Select a Role"
                defaultValue={UserRole.RECRUITER}
                data={[
                    { name: UserRole.ADMIN },
                    { name: UserRole.TEAM },
                    { name: UserRole.RECRUITER },
                ]}
            />
            {role === UserRole.RECRUITER && (
                <FormInput
                    id="commissionPercentage"
                    label="Commission (%)"
                    register={register}
                    errors={errors}
                    asNumber
                    testid="commission-input"
                />
            )}
            {/* <FormInput
                id="password"
                label="Password (auto generated)"
                register={register}
                errors={errors}
                testid="password-input"
            /> */}
        </div>
    )

    return (
        <RModal
            isOpen={isOpen}
            primaryActionLabel="Submit"
            body={bodyContent}
            secondaryAction={onClose}
            secondaryActionLabel="Cancel"
            primaryAction={handleSubmit(onSubmit)}
            isLoading={addTeamMember.isLoading}
            title="Add Teammember"
            subtitle="Create a new teammember"
            maxWidth={500}
        />
    )
}

export default AddTeamMemberModal
