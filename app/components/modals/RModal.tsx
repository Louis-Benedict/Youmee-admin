import { Button, Dialog, Flex } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

interface RModalProps {
    isOpen: boolean
    isLoading: boolean
    title: string
    subtitle: string
    body: React.ReactElement
    disabled?: boolean
    primaryAction?: VoidFunction
    primaryActionLabel?: string
    secondaryAction?: VoidFunction
    secondaryActionLabel?: string
    maxWidth?: number
}

const RModal: FC<RModalProps> = ({
    isOpen,
    isLoading,
    title,
    subtitle,
    body,
    disabled,
    primaryAction,
    primaryActionLabel,
    secondaryAction,
    secondaryActionLabel,
    maxWidth = 850,
}) => {
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Content style={{ maxWidth }} className="relative">
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description size="1" mb="4">
                    {subtitle}
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    {body}
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    {secondaryAction && (
                        <Dialog.Close onClick={secondaryAction}>
                            <Button
                                variant="soft"
                                color="gray"
                                disabled={disabled}
                            >
                                {secondaryActionLabel}
                            </Button>
                        </Dialog.Close>
                    )}
                    {primaryAction && (
                        <Dialog.Close onClick={primaryAction}>
                            <Button disabled={disabled}>
                                {isLoading && (
                                    <Loader2 className="animate-spin" />
                                )}
                                {primaryActionLabel}
                            </Button>
                        </Dialog.Close>
                    )}
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default RModal
