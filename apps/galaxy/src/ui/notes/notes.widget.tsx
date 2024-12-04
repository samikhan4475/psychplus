'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { AlertDialog } from './alert-dialog'
import { CreateNoteView } from './create-note'
import { NotesHeader } from './notes-header'
import { NotesLayout } from './notes-layout'
import { useStore } from './store'

interface NotesViewProps {
  patientId: string
}

const NotesWidget = ({ patientId }: NotesViewProps) => {
  const { isCreateNoteView, fetchAppointment } = useStore((state) => ({
    isCreateNoteView: state.isCreateNoteView,
    fetchAppointment: state.fetchAppointment,
  }))

  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  useEffect(() => {
    fetchAppointment(appointmentId as string)
  }, [])

  return (
    <Flex direction="column" width="100%" px="1">
      {isCreateNoteView ? (
        <CreateNoteView />
      ) : (
        <>
          <NotesHeader />
          <NotesLayout patientId={patientId} />
        </>
      )}
      <AlertDialog />
    </Flex>
  )
}

export { NotesWidget }
