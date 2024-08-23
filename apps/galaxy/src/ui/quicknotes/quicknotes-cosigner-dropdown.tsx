'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'

const QuickNotesCosignerDropdown = () => {
  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Cosigner
      </Text>
      <Select.Root size="1" value="dr-gregory-house">
        <Tooltip content="Dr. Gregory House">
          <Select.Trigger className="max-w-[150px]" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.Item value="dr-gregory-house">Dr. Gregory House</Select.Item>
          <Select.Item value="doctor-strange">Doctor Strange</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesCosignerDropdown }
