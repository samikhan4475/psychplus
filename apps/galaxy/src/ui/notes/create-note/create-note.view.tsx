'use client'

import { Box, Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { CosignerDropdown } from './cosigner.dropdown'
import { CreateNoteForm } from './create-note-form'
import { CreateNoteHeader } from './create-note-header'
import { DescriptionTextArea } from './description-textarea'
import { ProviderDropdown } from './provider.dropdown'
import { TimeInput } from './time-input'
import { VisitTitleDropdown } from './visit-title-dropdown'
import { VisitTypeDropdown } from './visit-type-dropdown'

const CreateNoteView = () => {
  return (
    <CreateNoteForm>
      <CreateNoteHeader />
      <Flex align={'start'} gap={'2'} p={'2'} className="bg-white shadow-2">
        <Box className="max-w-[88px]">
          <DatePickerInput label="Date" field="date" />
        </Box>
        <TimeInput />
        <VisitTypeDropdown />
        <VisitTitleDropdown />
        <ProviderDropdown />
        <CosignerDropdown />
      </Flex>
      <DescriptionTextArea />
    </CreateNoteForm>
  )
}

export { CreateNoteView }
