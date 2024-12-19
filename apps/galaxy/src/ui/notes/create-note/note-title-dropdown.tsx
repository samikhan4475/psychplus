'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'
import { NoteType } from './note-type-dropdown'
import { CreateNoteSchema } from './schema'
import { formatValue } from './utils'

const NoteTitleDropdown = () => {
  const form = useFormContext<CreateNoteSchema>()
  const noteType = form.watch('noteTypeCode')

  const value =
    (noteType && NoteType[noteType as keyof typeof NoteType]) ||
    'Unknown Note Type'

  const formattedValue = formatValue(value)
  form.setValue('noteTitleCode', formattedValue)

  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <Text size="1" weight="medium">
        Note Title
      </Text>
      <CodesetSelect
        name="noteTitleCode"
        codeset={CODESETS.NoteTitle}
        size="1"
        className="h-6 w-full"
        disabled
        value={formattedValue}
      />
      <FormFieldError name="noteTitleCode" />
    </Flex>
  )
}

export { NoteTitleDropdown }
