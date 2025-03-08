'use client'

import { Flex, Text, TextField } from '@radix-ui/themes'

interface Props {
  duration?: number
}

const QuickNotesDuration = ({ duration }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Duration
      </Text>
      <TextField.Root
        size="1"
        disabled
        className="w-16"
        value={duration ? `${duration} mins` : 'N/A'}
      />
    </Flex>
  )
}

export { QuickNotesDuration }
