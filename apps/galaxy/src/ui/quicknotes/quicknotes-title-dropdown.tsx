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
      <Select.Root size="1" value={title} disabled>
        {title ? (
          <Tooltip content={title}>
            <Select.Trigger className="max-w-[125px]" />
          </Tooltip>
        ) : (
          <Select.Trigger className="max-w-[125px]" />
        )}
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {title && <Select.Item value={title ?? ''}>{title}</Select.Item>}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesTitleDropdown }
