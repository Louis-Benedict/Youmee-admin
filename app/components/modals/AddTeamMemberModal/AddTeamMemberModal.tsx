'use client'

import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import Modal from '@/app/components/modals/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import PageInput from '@/app/components/inputs/PageInput'
import DropdownInput from '../../inputs/CountryInput'
import { UserRole } from '@prisma/client'
import useAddTeamMemberModal from './useTeamMemberModal'
import { UserPlus } from 'lucide-react'
import {
    TeamMemberAddSchema,
    teamMemberAddSchema,
} from '@/app/(dashboard)/team/validation'
import { useAddTeamMember } from '@/app/(dashboard)/team/queries'

const AddTeamMemberModal = () => {
    const addTeamMemberModal = useAddTeamMemberModal()
    const addTeamMember = useAddTeamMember()

    const {
        control,
        watch,
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
        <div className="flex flex-col mt-8 gap-8">
            <PageInput
                id="name"
                label="Name"
                register={register}
                errors={errors}
            />
            <PageInput
                id="phoneNumber"
                label="Phone number"
                register={register}
                errors={errors}
            />
            <PageInput
                id="email"
                label="Email"
                register={register}
                errors={errors}
            />
            <PageInput
                id="lineId"
                label="Line ID"
                register={register}
                errors={errors}
            />

            <DropdownInput
                control={control}
                register={register}
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
            {/* {role === UserRole.RECRUITER && (
                <PageInput
                    type="number"
                    id="commissionPercentage"
                    label="Commission (%)"
                    register={register}
                    errors={errors}
                />
            )} */}
            <PageInput
                id="password"
                label="Password (auto generated)"
                register={register}
                errors={errors}
            />
        </div>
    )

    const footerContent = <div></div>

    return (
        <Modal
            isLoading={addTeamMember.isLoading}
            disabled={addTeamMember.isLoading}
            isOpen={addTeamMemberModal.isOpen}
            actionLabel="Submit"
            title={
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <UserPlus size={45} />
                    </div>
                    <div>
                        <div>Add team member</div>
                        <div className="text-xs font-normal text-neutral-600 mt-1">
                            Add a new Team member
                        </div>
                    </div>
                </div>
            }
            body={bodyContent}
            footer={footerContent}
            onClose={addTeamMemberModal.onClose}
            onSubmit={handleSubmit(onSubmit as any)}
        />
    )
}

export default AddTeamMemberModal
