import { Box, Flex, Heading, Text } from '@radix-ui/themes'

export default function NotFound() {
    return (
        <div className="h-full">
            <div className="flex items-center justify-center h-full -mt-8">
                <Box>
                    <Flex direction="column" gap="2">
                        <Heading
                            size="9"
                            weight="bold"
                            className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent text-center"
                        >
                            404
                        </Heading>
                        <Text color="gray" weight="medium">
                            Could not find requested resource
                        </Text>
                    </Flex>
                </Box>
            </div>
        </div>
    )
}
