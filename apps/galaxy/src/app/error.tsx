'use client'

import { useEffect } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Caught by error boundary:', error)
  }, [error])

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen gap-4 p-6 text-center"
    >
      <Text size="5" weight="bold" color="red">
        Something went wrong
      </Text>

      <Text
        size="2"
        className="bg-red-50 border-red-200 text-red-800 rounded w-full max-w-xl overflow-auto whitespace-pre-wrap border p-4 text-left"
      >
        {error.message}
      </Text>

      <Button variant="solid" color="blue" onClick={reset}>
        Try Again
      </Button>
    </Flex>
  )
}
