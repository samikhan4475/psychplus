'use client'

import { useState } from 'react'
import { Flex, Select } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { Cosigner } from '@/types'
import { getPatientFullName } from '@/utils'
import { CosignSchemaType } from '../cosign-dialog-form'

interface NotesCosignerDropdownProps {
  cosigners?: Cosigner[]
  setField: (value: string) => void
  placeholder?: string
}

const NotesCosignerDropdown = ({
  cosigners,
  setField,
  placeholder = 'Cosigners',
}: NotesCosignerDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState('')
  const form = useFormContext<CosignSchemaType>()
  setField(selectedOption)
  form.setValue('provider', selectedOption)

  return (
    <Flex direction="column" gap="1">
      <Select.Root
        size="1"
        onValueChange={setSelectedOption}
        value={selectedOption}
      >
        <Select.Trigger className="h-6 w-full" placeholder={placeholder} />
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

export { NotesCosignerDropdown }
