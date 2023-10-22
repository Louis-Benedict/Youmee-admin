'use client'

import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DropdownInput from '../../inputs/DropdownInput'
import { UserRole } from '@prisma/client'
import useUserSettingsModal from './useUserSettingsModal'
import {
    TeamMemberEditSchema,
    teamMemberEditSchema,
} from '@/app/(dashboard)/team/validation'
import { useEditTeamMember } from '@/app/(dashboard)/team/queries'
import RModal from '../RModal'
import { IconButton } from '@radix-ui/themes'
import { UserPlus } from 'lucide-react'
import FormInput from '../../inputs/FormInput'

const EditTeamMemberModal = () => {
    const { selectedTeamMember, onClose, isOpen } = useUserSettingsModal()

    const editTeamMember = useEditTeamMember()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TeamMemberEditSchema>({
        resolver: zodResolver(teamMemberEditSchema),
    })

    useEffect(() => {
        reset({ ...(selectedTeamMember as any) })
    }, [selectedTeamMember])

    useEffect(() => {
        console.log(errors)
    }, [errors])

    const onSubmit: SubmitHandler<TeamMemberEditSchema> = (data) => {
        editTeamMember.mutate({ ...data }, { onSuccess: onClose })
    }

    const roles = useMemo(
        () =>
            (Object.keys(UserRole) as Array<keyof typeof UserRole>).map(
                (key) => ({ name: UserRole[key] })
            ),
        []
    )

    const bodyContent = (
        <div className="flex flex-col gap-2">
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
                required
            />
            <FormInput
                id="email"
                label="Email"
                disabled
                errors={errors}
                register={register}
            />
            <FormInput
                id="lineId"
                label="Line ID"
                errors={errors}
                register={register}
            />
            <FormInput
                id="commissionPercentage"
                label="Commission (%)"
                errors={errors}
                register={register}
                asNumber
            />

            <DropdownInput
                control={control}
                defaultValue={UserRole.RECRUITER}
                errors={errors}
                isLoading={editTeamMember.isLoading}
                id="role"
                label="Role"
                data={roles}
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
            isOpen={isOpen}
            isLoading={editTeamMember.isLoading}
            disabled={editTeamMember.isLoading}
            title="Adjust your user settings"
            subtitle="Adjust a team members details"
            body={bodyContent}
            secondaryActionLabel="Cancel"
            secondaryAction={onClose}
            primaryActionLabel="Submit"
            primaryAction={handleSubmit(onSubmit)}
        />
    )
}

export default EditTeamMemberModal
