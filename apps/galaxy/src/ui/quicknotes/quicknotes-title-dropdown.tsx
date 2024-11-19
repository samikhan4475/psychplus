'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

interface Props {
  title?: string
}

const QuickNotesTitleDropdown = ({ title }: Props) => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Title
      </Text>
      <Select.Root size="1" value="psychiatric-evaluation" disabled>
        <Tooltip content="Psychiatric Evaluation">
          <Select.Trigger className="max-w-[125px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="psychiatric-evaluation">{title}</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesTitleDropdown }
