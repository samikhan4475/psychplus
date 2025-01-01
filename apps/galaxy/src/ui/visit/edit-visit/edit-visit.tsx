'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { EditVisitForm } from './components'

const EditVisit = ({
  appointmentId,
  onEdit,
  disabled = false,
  children,
}: PropsWithChildren<{
  appointmentId: number
  disabled?: boolean
  onEdit?: () => void
}>) => {
  const [visitDetails, setVisitDetails] = useState<Appointment>()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) fetchVisitDetails()
  }, [isOpen])

  const fetchVisitDetails = async () => {
    getBookedAppointmentsAction({
      appointmentIds: [appointmentId],
    }).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error || 'Failed to retrieve appointment\'s data')
      } else {
        const visit = response.data[0]
        setVisitDetails(visit)
      }
      setIsLoading(false)
    })
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger disabled={disabled}>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Edit Visit - Visit Details
        </Dialog.Title>

        {isLoading ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
        ) : (
          <EditVisitForm
            appointmentId={appointmentId}
            onEdit={onEdit}
            isLoading={isLoading}
            visitDetails={visitDetails as Appointment}
            onClose={() => setIsOpen(false)}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditVisit }
