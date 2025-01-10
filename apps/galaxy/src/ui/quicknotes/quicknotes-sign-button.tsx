'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { Appointment, AuthSession, StaffResource } from '@/types'
import { useStore } from './quicknotes-store'

interface QuickNotesSignButtonProps {
  appointment: Appointment
  auth: AuthSession | undefined
  appointmentProvider?: StaffResource
}

const QuickNotesSignButton = ({
  appointment,
  auth,
  appointmentProvider,
}: QuickNotesSignButtonProps) => {
  const { sign, loading, setErrorMessage, setIsErrorAlertOpen } = useStore(
    (state) => ({
      sign: state.sign,
      loading: state.loading,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    }),
  )

  const patientId = useParams().id as string
  const visitType = useSearchParams().get('visitType') as string
  const appointmentId = useSearchParams().get('id') as string

  const signNote = async () => {
    if (
      appointmentProvider?.userId !== auth?.user.userId &&
      appointmentProvider?.contactInfo?.email !== auth?.user.email
    ) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You are not the provider for this note, therefore you can not sign this visit',
      )

      return
    }

    sign({ patientId, appointmentId, appointment, visitType })
  }

  return (
    <Button size="1" onClick={signNote} disabled={loading} highContrast>
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { QuickNotesSignButton }
