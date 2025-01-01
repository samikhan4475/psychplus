import { PropsWithChildren, useEffect, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseDialogTrigger, LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { EditVisitForm } from '@/ui/visit/edit-visit/components'
import { getBookedAppointmentsAction } from '../actions'
import { useRefetchAppointments } from '../hooks'

const AddProviderTypeDialog = ({
  appointmentId,
  isPsychiatristVisitTypeSequence,
  children,
}: PropsWithChildren<{
  appointmentId: number
  isPsychiatristVisitTypeSequence: boolean
}>) => {
  const [visitDetails, setVisitDetails] = useState<Appointment>()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const refetch = useRefetchAppointments()

  useEffect(() => {
    if (isOpen) fetchVisitDetails()
  }, [isOpen])

  const fetchVisitDetails = async () => {
    getBookedAppointmentsAction({
      appointmentIds: [appointmentId],
    }).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error || 'Failed to retrieve appointments data')
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
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add (Provider Type)
        </Dialog.Title>

        {isLoading ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
        ) : (
          <EditVisitForm
            onEdit={refetch}
            appointmentId={appointmentId}
            isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
            isLoading={isLoading}
            visitDetails={visitDetails as Appointment}
            onClose={() => setIsOpen(false)}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddProviderTypeDialog }
