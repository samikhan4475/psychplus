'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { TableEditIcon } from '@/components/icons'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { EDIT_APPOINTMENT } from '@/ui/schedule/constants'
import {
  useInactiveRowStatus,
  useSchedulerPermissions,
} from '@/ui/schedule/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { EditVisit } from '@/ui/visit/edit-visit'
import { useStore } from '../store'

const RowActionEdit = ({ row }: PropsWithRow<Appointment>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { staffId } = useGlobalStore((state) => state.user)
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const searchParams = useSearchParams()
  const { permissionToEditOtherAppointments, permissionToEditSelfAppointment } =
    useSchedulerPermissions()
  const hasPermissionToEditSelfAppointment =
    staffId === row.original.providerId && permissionToEditSelfAppointment
  const hasPermissionToEditAppointment = hasPermissionToEditSelfAppointment
    ? true
    : !!permissionToEditOtherAppointments
  const isInactiveVisit = useInactiveRowStatus(
    row.original.visitStatus,
    row.original.isServiceTimeDependent,
  )
  const onEdit = () => {
    const appointmentId = searchParams.get('id') || '0'
    search({
      patientIds: [Number(row.original.patientId)],
      appointmentIds: [Number(appointmentId)],
    })
  }
  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
        }}
      />
      {hasPermissionToEditAppointment ? (
        <EditVisit
          appointmentId={row.original.appointmentId}
          onEdit={onEdit}
          disabled={isInactiveVisit}
        >
          <IconButton variant="ghost">
            <TableEditIcon height={18} />
          </IconButton>
        </EditVisit>
      ) : (
        <IconButton
          variant="ghost"
          disabled={isInactiveVisit}
          onClick={() => {
            setAlertMessage(EDIT_APPOINTMENT)
            setIsOpen(true)
          }}
        >
          <TableEditIcon height={18} />
        </IconButton>
      )}
    </>
  )
}

export { RowActionEdit }
