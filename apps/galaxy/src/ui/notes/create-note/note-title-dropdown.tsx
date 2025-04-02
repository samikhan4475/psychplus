'use client'

import { useEffect, useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { CreateNoteSchema } from './schema'
import { getNoteTypeTitle } from './utils'

const NoteTitleDropdown = () => {
  const form = useFormContext<CreateNoteSchema>()
  const noteType = form.watch('noteTypeCode')

  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType)

  const noteTitleValue = useMemo(
    () => getNoteTypeTitle(noteType, noteTypeCodes),
    [noteType, noteTypeCodes],
  )

  useEffect(() => {
    form.setValue('noteTitleCode', noteTitleValue)
  }, [noteTitleValue, form])

  return (
    <Flex direction="column" className="w-full gap-0.5">
      <Text size="1" weight="medium">
        Note Title
      </Text>
      <CodesetSelect
        name="noteTitleCode"
        codeset={CODESETS.NoteTitle}
        size="1"
        className="h-6 w-full"
        disabled
        value={noteTitleValue}
      />
      <FormFieldError name="noteTitleCode" />
    </Flex>
  )
}

export { NoteTitleDropdown }
