'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PageInput from '@/app/components/inputs/PageInput'
import DropdownInput from '../../inputs/CountryInput'
import { UserRole } from '@prisma/client'
import useAddTeamMemberModal from './useTeamMemberModal'
import {
    TeamMemberAddSchema,
    teamMemberAddSchema,
} from '@/app/(dashboard)/team/validation'
import { useAddTeamMember } from '@/app/(dashboard)/team/queries'
import RModal from '../RModal'
import FormInput from '../../inputs/FormInput'

const AddTeamMemberModal = () => {
    const addTeamMemberModal = useAddTeamMemberModal()
    const addTeamMember = useAddTeamMember()

    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(teamMemberAddSchema),
        defaultValues: {
            password: Math.random().toString(20).substr(2, 20),
            role: UserRole.RECRUITER,
        },
    })

    const onSubmit: SubmitHandler<TeamMemberAddSchema> = (data) => {
        addTeamMember.mutate({ ...(data as any) })
    }

    const role = watch('role')

    const bodyContent = (
        <div className="flex flex-col mt-8 gap-2">
            <FormInput
                id="name"
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
            <FormInput
                id="lineId"
                label="Line ID"
                register={register}
                errors={errors}
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
                />
            )}
            <FormInput
                id="password"
                label="Password (auto generated)"
                register={register}
                errors={errors}
            />
        </div>
    )

    return (
        <RModal
            isOpen={addTeamMemberModal.isOpen}
            primaryActionLabel="Submit"
            body={bodyContent}
            secondaryAction={addTeamMemberModal.onClose}
            secondaryActionLabel="Cancel"
            primaryAction={handleSubmit(onSubmit as any)}
            isLoading={true}
            title="Add Teammember"
            subtitle="Create a new teammember"
            maxWidth={500}
        />
    )
}

export default AddTeamMemberModal
