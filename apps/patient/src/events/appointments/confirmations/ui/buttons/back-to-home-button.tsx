'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Flex, Text } from '@radix-ui/themes'

const BackToHomeButton = () => {
  const router = useRouter()
  return (
    <Flex
      py="3"
      justify="center"
      align="center"
      gap="3"
      className="mt-4 w-full"
    >
      <Box className="w-full sm:w-auto">
        <Button
          className="bg-pp-blue-3 w-full sm:w-auto"
          radius="full"
          size="3"
          highContrast
          onClick={() => router.replace('/')}
        >
          <Text className="px-8 sm:px-10">Back to Home</Text>
        </Button>
      </Box>
    </Flex>
  )
}

export { BackToHomeButton }
