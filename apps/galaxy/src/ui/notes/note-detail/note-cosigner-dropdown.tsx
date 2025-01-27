'use client'

import { Flex, Select } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { Cosigner } from '@/types'
import { getPatientFullName } from '@/utils'
import { SchemaType } from '../create-note/create-note-form'
import { filterDefaultCosigner } from '../create-note/utils'

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
  const form = useFormContext<SchemaType>()
  const value = form.watch('cosigner')
  const cosignerId = filterDefaultCosigner(cosigners || [])?.userId || ''

  return (
    <Flex direction="column" gap="1">
      <Select.Root
        size="1"
        onValueChange={setField}
        value={value}
        defaultValue={(cosignerId as string) || ''}
      >
        <Select.Trigger className="h-6 w-full" placeholder={placeholder} />
        <Select.Content
          highContrast
          position="popper"
          align="center"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {cosigners?.map(({ id, legalName, userId }, ind) => (
            <Select.Item key={`${id}-${ind}`} value={String(userId)}>
              {getPatientFullName(legalName)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { NotesCosignerDropdown }
