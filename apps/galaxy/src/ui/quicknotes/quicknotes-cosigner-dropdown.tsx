'use client'

import { useState } from 'react'
import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Cosigner } from '@/types'
import { getPatientFullName } from '@/utils'

interface QuickNotesCosignerDropdownProps {
  cosigners: Cosigner[]
}
const QuickNotesCosignerDropdown = ({
  cosigners,
}: QuickNotesCosignerDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState('')

  const getLabel = (value: string) => {
    const selectedOption = cosigners.find(
      (option) => option?.id === Number(value),
    )
    return selectedOption?.legalName
      ? getPatientFullName(selectedOption?.legalName)
      : undefined
  }

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Cosigner
      </Text>
      <Select.Root
        size="1"
        onValueChange={setSelectedOption}
        value={selectedOption}
      >
        <Tooltip content={getLabel(selectedOption)}>
          <Select.Trigger className="max-w-[150px]" placeholder="Cosigners" />
        </Tooltip>
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {cosigners?.map(({ id, legalName }, ind) => (
            <Select.Item key={`${id}-${ind}`} value={String(id)}>
              {getPatientFullName(legalName)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesCosignerDropdown }
