'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput, TimeInput } from '@/components'
import { Appointment } from '@/types'
import { CosignerDropdown } from './cosigner-dropdown'
import { CreateNoteForm } from './create-note-form'
import { CreateNoteHeader } from './create-note-header'
import { DescriptionTextArea } from './description-textarea'
import { NoteTitleDropdown } from './note-title-dropdown'
import { NoteTypeDropdown } from './note-type-dropdown'
import { ProviderDropdown } from './provider-dropdown'
import { SecondaryNotePrintView } from './secondary-note-print-view'

const CreateNoteView = ({
  noteAppointment,
}: {
  noteAppointment: Appointment
}) => {
  return (
    <CreateNoteForm noteAppointment={noteAppointment}>
      <CreateNoteHeader id="secondary-note-view-print" />
      <Flex align={'start'} gap={'2'} p={'2'} className="bg-white shadow-2">
        <DatePickerInput
          label="Date"
          field="date"
          className="max-w-[101px]"
          isRequired
        />
        <TimeInput
          label="Time"
          field="time"
          className="w-[400px]"
          dateInputClass="h-[24px]"
          showIcon={true}
          isRequired
          showError
        />
        <NoteTypeDropdown />
        <NoteTitleDropdown />
        <ProviderDropdown appointment={noteAppointment} />
        <CosignerDropdown appointment={noteAppointment} />
      </Flex>
      <DescriptionTextArea />
      <SecondaryNotePrintView appointment={noteAppointment} />
    </CreateNoteForm>
  )
}

export { CreateNoteView }
