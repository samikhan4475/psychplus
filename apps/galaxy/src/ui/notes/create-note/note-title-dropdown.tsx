'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, SelectInput } from '@/components'
import { NoteType } from './note-type-dropdown'
import { CreateNoteSchema } from './schema'
import { formatValue } from './utils'

enum NoteTitle {
  Results = 'Results',
  MedicalRecords = 'Medical Records',
  Consent = 'Consent',
  Referral = 'Referral',
  Authorization = 'Authorization',
  PersonalInformation = 'Personal Information',
  Billing = 'Billing',
  Communication = 'Communication',
}

const noteTitleOptions = Object.entries(NoteTitle).map(([key, value]) => ({
  label: value,
  value: key,
}))

const NoteTitleDropdown = () => {
  const form = useFormContext<CreateNoteSchema>()
  const noteType = form.watch('noteType')

  const value =
    (noteType && NoteType[noteType as keyof typeof NoteType]) ||
    'Unknown Note Type'

  const formattedValue = formatValue(value)
  form.setValue('noteTitle', formattedValue)

  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <Text size="1" weight="medium">
        Note Title
      </Text>

      <SelectInput
        field="noteTitle"
        options={noteTitleOptions}
        placeholder="Select Visit Title"
        buttonClassName={buttonClassName}
        value={formattedValue}
        disabled
      />
      <FormFieldError name="noteTitle" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'

export { NoteTitleDropdown }
