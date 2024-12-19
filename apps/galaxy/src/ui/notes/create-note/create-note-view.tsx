'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { CosignerDropdown } from './cosigner.dropdown'
import { CreateNoteForm } from './create-note-form'
import { CreateNoteHeader } from './create-note-header'
import { DescriptionTextArea } from './description-textarea'
import { NoteTitleDropdown } from './note-title-dropdown'
import { NoteTypeDropdown } from './note-type-dropdown'
import { ProviderDropdown } from './provider-dropdown'
import { TimeInput } from './time-input'

const CreateNoteView = () => {
  return (
    <CreateNoteForm>
      <CreateNoteHeader />
      <Flex align={'start'} gap={'2'} p={'2'} className="bg-white shadow-2">
        <DatePickerInput label="Date" field="date" className="max-w-[101px]" />
        <TimeInput />
        <NoteTypeDropdown />
        <NoteTitleDropdown />
        <ProviderDropdown />
        <CosignerDropdown />
      </Flex>
      <DescriptionTextArea />
    </CreateNoteForm>
  )
}

export { CreateNoteView }
