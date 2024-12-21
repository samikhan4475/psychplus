'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { getAppointment } from '@/actions/get-appointment'
import { DatePickerInput } from '@/components'
import { Appointment } from '@/types'
import { CosignerDropdown } from './cosigner.dropdown'
import { CreateNoteForm } from './create-note-form'
import { CreateNoteHeader } from './create-note-header'
import { DescriptionTextArea } from './description-textarea'
import { NoteTitleDropdown } from './note-title-dropdown'
import { NoteTypeDropdown } from './note-type-dropdown'
import { ProviderDropdown } from './provider-dropdown'
import { TimeInput } from './time-input'

const CreateNoteView = () => {
  const [appointment, setAppointment] = useState<Appointment>()
  const searchParams = useSearchParams()

  const appointmentId = searchParams.get('id')
  useEffect(() => {
    const fetchData = async () => {
      if (appointmentId) {
        const appointment = await getAppointment(appointmentId)
        if (appointment.state === 'error') {
          return
        }
        setAppointment(appointment.data)
      }
    }
    fetchData()
  }, [])
  return (
    <CreateNoteForm>
      <CreateNoteHeader />
      <Flex align={'start'} gap={'2'} p={'2'} className="bg-white shadow-2">
        <DatePickerInput label="Date" field="date" className="max-w-[101px]" />
        <TimeInput />
        <NoteTypeDropdown />
        <NoteTitleDropdown />
        <ProviderDropdown appointment={appointment} />
        <CosignerDropdown appointment={appointment} />
      </Flex>
      <DescriptionTextArea />
    </CreateNoteForm>
  )
}

export { CreateNoteView }
