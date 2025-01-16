'use client'

import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { AlertDialog } from '../alerts'
import { useStore } from './store'

interface QuickNotesSignButtonProps {
  appointment: Appointment
}

enum AlertType {
  warning = 'warning',
  error = 'error',
  confirmation = 'confirmation',
  hide = 'hide',
}

const initialAlertInfo = {
  title: 'Warning',
  message: '',
  type: AlertType.hide,
  onProceed: () => {},
  okButton: { text: 'Ok', onClick: () => {} },
  cancelButton: { text: 'Cancel', onClick: () => {} },
  disableClose: false,
  show: false,
}

const QuickNotesSignButton = ({ appointment }: QuickNotesSignButtonProps) => {
  const { staffId } = useGlobalStore((state) => state.user)
  const { sign, loading, markAsError } = useStore((state) => ({
    sign: state.sign,
    loading: state.loading,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    markAsError: state.markAsError,
  }))

  const [alertInfo, setAlertInfo] = useState(initialAlertInfo)

  const patientId = useParams().id as string
  const visitType = useSearchParams().get('visitType') as string
  const appointmentId = useSearchParams().get('id') as string
  const isAppointmentProvider = appointment.providerStaffId === staffId
  const isFutureAppointment =
    appointment?.startDate && new Date(appointment.startDate) > new Date()

  const signNoteHandler = async () => {
    if (!isAppointmentProvider) {
      setAlertInfo((prev) => ({
        ...prev,
        show: true,
        title: 'Warning',
        type: AlertType.warning,
        message:
          'You are not the provider for this note, therefore you can not sign this visit',
        disabelClose: true,
      }))
      return
    }
    if (!isFutureAppointment) {
      setAlertInfo((prev) => ({
        ...prev,
        show: true,
        title: 'Warning',
        type: AlertType.warning,
        message:
          'Your note time is prior to visit scheduled time, do you wish to proceed?',
        okButton: {
          text: 'Proceed',
          onClick: signNote,
        },
      }))
      return
    }

    signNote()
  }

  const signNote = async () => {
    const signResults = await sign({
      patientId,
      appointmentId,
      appointment,
      visitType,
    })

    if (signResults.state === 'success') {
      toast.success('Quicknote signed!')
      return
    }

    if (signResults.error.includes('mark that note as error?')) {
      setAlertInfo((prev) => ({
        ...prev,
        show: true,
        type: AlertType.confirmation,
        message:
          'Primary note for this visit already exists, if you sign this note, it will mark the existing note as Error.',
        okButton: {
          text: 'Proceed',
          onClick: () => {
            setAlertInfo(initialAlertInfo)
            markAsError({ patientId, appointmentId })
          },
        },
      }))
    }
  }

  return (
    <>
      <Button
        size="1"
        onClick={signNoteHandler}
        disabled={loading}
        highContrast
      >
        <PenLineIcon height={14} width={14} strokeWidth={2} />
        Sign
      </Button>

      <AlertDialog
        open={!!alertInfo.show}
        onOpenChange={(open) => {
          if (!open) {
            setAlertInfo(initialAlertInfo)
          }
        }}
        loading={loading}
        {...alertInfo}
      />
    </>
  )
}

export { QuickNotesSignButton }
