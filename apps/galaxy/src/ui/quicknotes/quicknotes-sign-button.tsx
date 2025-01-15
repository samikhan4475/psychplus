'use client'

import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button, Dialog } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { useStore as useGlobalStore } from '@/store'
import { Appointment, StaffResource } from '@/types'
import { ConfirmationAlertDialogContent } from '../alerts'
import { useStore } from './store'

interface QuickNotesSignButtonProps {
  appointment: Appointment
  appointmentProvider?: StaffResource
}

const QuickNotesSignButton = ({
  appointment,
  appointmentProvider,
}: QuickNotesSignButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { staffId, id = '' } = useGlobalStore((state) => state.user)
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
  const isFutureAppointment =
    appointment?.startDate && new Date(appointment.startDate) > new Date()
  const isAppointmentProviderLoggedIn = appointmentProvider?.userId === id

  const signNote = async () => {
    if (appointment.providerStaffId !== staffId) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You are not the provider for this note, therefore you can not sign this visit',
      )

      return
    }

    sign({ patientId, appointmentId, appointment, visitType }, () =>
      setIsOpen(false),
    )
  }

  return (
    <>
      {isFutureAppointment && isAppointmentProviderLoggedIn ? (
        <Dialog.Root
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
          }}
        >
          <Dialog.Trigger>
            <Button size="1" disabled={loading} highContrast>
              <PenLineIcon height={14} width={14} strokeWidth={2} />
              Sign
            </Button>
          </Dialog.Trigger>
          <ConfirmationAlertDialogContent
            title="Sign"
            loadingTitle="Signing"
            onProceed={signNote}
            loading={loading}
            message="Your note time is prior to visit scheduled time, do you wish to proceed?"
            okButtonText="Yes"
            cancelButtonText="No"
          />
        </Dialog.Root>
      ) : (
        <Button size="1" onClick={signNote} disabled={loading} highContrast>
          <PenLineIcon height={14} width={14} strokeWidth={2} />
          Sign
        </Button>
      )}
    </>
  )
}

export { QuickNotesSignButton }
