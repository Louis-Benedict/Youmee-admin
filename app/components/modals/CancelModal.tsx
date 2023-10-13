'use client'

import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from '@/app/components/ui/toast'
import { toastMessages } from '@/app/static/toastMessages'
import useCancelModal from '@/app/hooks/useCancelModal'
import TextArea from '../inputs/TextArea'
import axios from 'axios'
import RModal from './RModal'

const LoginModal = () => {
    const router = useRouter()
    const cancelModal = useCancelModal()

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            targetOrderId: '',
        },
    })

    useEffect(() => {
        reset({ targetOrderId: cancelModal.targetOrderId })
    }, [cancelModal.targetOrderId])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios
            .post('/api/order/cancel', data)
            .then(() => {
                toast(toastMessages.orderCancelled.success)
                router.refresh()
                reset()
                cancelModal.onClose()
            })
            .catch(() => {
                toast(toastMessages.orderCancelled.error)
            })

        setIsLoading(false)
        reset()
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <TextArea
                id="reason"
                label="Reason"
                disabled={isLoading}
                register={register}
                errors={errors}
                placeholder="Please provide the user a reason why you cant fulfill his request"
                required
            />
        </div>
    )

    return (
        <RModal
            disabled={isLoading}
            isOpen={cancelModal.isOpen}
            primaryActionLabel="Cancel"
            title="Are you sure you want to cancel?"
            secondaryAction={cancelModal.onClose}
            secondaryActionLabel="Go Back"
            primaryAction={handleSubmit(onSubmit)}
            body={bodyContent}
            onOpenChange={() => {}}
            triggerElement={undefined}
            isLoading={false}
            subtitle={''}
        />
    )
}

export default LoginModal
