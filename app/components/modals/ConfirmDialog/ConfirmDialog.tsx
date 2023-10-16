import { FC, memo, useCallback, useState } from 'react'
import useConfirmDialog from './useConfirmDialog'
import { MutateOptions } from '@tanstack/react-query'
import { Text } from '@radix-ui/themes'
import RModal from '../RModal'

interface ConfirmDialogProps {
    primaryAction: (
        variables: any,
        options?: MutateOptions<any, unknown, any, unknown> | undefined
    ) => void
    description: string
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
    primaryAction,
    description,
}) => {
    const [loading, setLoading] = useState(false)
    const { id, isOpen, onClose } = useConfirmDialog()

    const handlePrimaryAction = useCallback(() => {
        setLoading(true)
        primaryAction(id, {
            onSuccess: onClose,
            onSettled: () => setLoading(false),
        })
    }, [primaryAction, id])

    const bodyContent = <Text className="mb-4">{description}</Text>

    return (
        <RModal
            isOpen={isOpen}
            isLoading={loading}
            title="Are you sure?"
            subtitle=""
            maxWidth={400}
            body={bodyContent}
            secondaryAction={onClose}
            secondaryActionLabel="Cancel"
            primaryAction={handlePrimaryAction}
            primaryActionLabel="I am sure"
        />
    )
}

export default memo(ConfirmDialog)
