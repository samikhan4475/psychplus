'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { LoadingPlaceholder } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { EditVisitForm } from './components'

const EditVisit = ({
  appointmentId,
  onEdit,
  disabled = false,
  children,
  isFormDisabled,
}: PropsWithChildren<{
  appointmentId: number
  disabled?: boolean
  onEdit?: () => void
  isFormDisabled?: boolean
}>) => {
  const [visitDetails, setVisitDetails] = useState<Appointment>()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) fetchVisitDetails()
  }, [isOpen])

  const handleCustomAppointment = async (appointment: Appointment) => {
    const { patientId, appointmentId } = appointment
    const result = await getQuickNoteDetailAction(
      String(patientId),
      [
        QuickNoteSectionName.QuicknoteSectionCodes,
        QuickNoteSectionName.QuickNoteSectionDiagnosis,
      ],
      undefined,
      String(appointmentId),
    )

    if (result.state === 'error')
      return toast.error(result.error ?? 'Failed to fetch custom visit details')

    const customDiagnosis =
      result.data.find(
        (code) =>
          code.sectionName === QuickNoteSectionName.QuickNoteSectionDiagnosis &&
          code.sectionItem === 'diagnosis',
      )?.sectionItemValue ?? ''

    const { customAddons, customCptCodes } = result.data.reduce(
      (acc, quickNoteItem) => {
        const { sectionItem, sectionItemValue } = quickNoteItem

        switch (sectionItem) {
          case 'cptAddonCodes':
            acc.customAddons += acc.customAddons
              ? `,${sectionItemValue}`
              : sectionItemValue
            break
          case 'cptPrimaryCodes':
            acc.customCptCodes += acc.customCptCodes
              ? `,${sectionItemValue}`
              : sectionItemValue
            break
        }

        return acc
      },
      { customAddons: '', customCptCodes: '' },
    )
    setVisitDetails({
      ...appointment,
      customDiagnosis,
      customAddons,
      customCptCodes,
    })
  }

  const fetchVisitDetails = async () => {
    getBookedAppointmentsAction({
      appointmentIds: [appointmentId],
    }).then(async (response) => {
      if (response.state === 'error') {
        toast.error(response.error || "Failed to retrieve appointment's data")
      } else {
        const { isCustomAppointment } = response.data[0]
        const visit = response.data[0]
        if (isCustomAppointment) {
          await handleCustomAppointment(visit)
        } else {
          setVisitDetails(visit)
        }
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
            isFormDisabled={isFormDisabled}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditVisit }
