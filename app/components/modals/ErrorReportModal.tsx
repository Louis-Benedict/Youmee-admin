import { Dialog, Text, TextField, Flex, Button } from '@radix-ui/themes'
import { FC } from 'react'

interface ErrorReportModalProps {}

const ErrorReportModal: FC<ErrorReportModalProps> = ({}) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <span>Click here</span>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Report a problem</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Please fill out the form here.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Input
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Input
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default ErrorReportModal
