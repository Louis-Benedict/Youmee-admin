import { Button, Dialog, Flex, TextField, Text } from '@radix-ui/themes'
import { FC, ReactNode } from 'react'

interface RModalProps {
    isOpen: boolean
    onOpenChange: VoidFunction
    triggerElement: ReactNode
    isLoading: boolean
    title: string
    subtitle: string
    body: React.ReactElement
    disabled?: boolean
    primaryAction?: VoidFunction
    primaryActionLabel: string
    secondaryAction?: VoidFunction
    secondaryActionLabel?: string
}

const RModal: FC<RModalProps> = ({
    isOpen,
    onOpenChange,
    triggerElement,
    isLoading,
    title,
    subtitle,
    body,
    disabled,
    primaryAction,
    primaryActionLabel,
    secondaryAction,
    secondaryActionLabel,
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            {/* <Dialog.Trigger>{triggerElement}</Dialog.Trigger> */}

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description size="1" mb="4">
                    {subtitle}
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    {body}
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close onClick={secondaryAction}>
                        <Button variant="soft" color="gray" disabled={disabled}>
                            {secondaryActionLabel}
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close onClick={primaryAction}>
                        <Button disabled={disabled}>
                            {primaryActionLabel}
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default RModal
