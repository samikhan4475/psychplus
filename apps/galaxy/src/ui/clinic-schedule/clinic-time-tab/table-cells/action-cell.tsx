import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Flex, IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { TableEditIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { PermissionAlert } from '@/ui/schedule/shared'
import { isPrescriber } from '@/utils'
import { useStore } from '../../clinic-time-tab/store'
import { EditClinicScheduleDialog } from '../../dialogs/clinic-schedule-dialog'
import { ClinicAlertMessages, ClinicScheduleStatus } from '../constants'
import { ClinicSchedule } from '../types'

interface ActionCellProps extends PropsWithRow<ClinicSchedule> {
  showApproveButton?: boolean
}

const ActionCell = ({
  row: { original: clinicTime },
  showApproveButton = false,
}: ActionCellProps) => {
  const staffId = String(clinicTime.staffId)
  const pathname = usePathname()
  const [showApproveScheduleAlert, setShowApproveScheduleAlert] =
    useState(false)

  const hasPermissionToUpdateSchedule = useHasPermission(
    'clickEditClinicTimeTab',
  )
  const hasPermissionToApproveSchedule = useHasPermission(
    'clickApprovedClinicTimeTab',
  )

  const loggedInStaff = useGlobalStore((state) => state.staffResource)
  const isAdminView = pathname.includes('staff')
  const isProvider = isPrescriber(loggedInStaff)

  const { updateClinicScheduleStatus, refetch } = useStore((store) => ({
    updateClinicScheduleStatus: store.updateClinicScheduleStatus,
    refetch: store.refetch,
  }))
  const canUpdateSchedule = isProvider
    ? loggedInStaff?.id.toString() === staffId && hasPermissionToUpdateSchedule
    : hasPermissionToUpdateSchedule

  const handleApproveClinicSchedule = async () => {
    if (!hasPermissionToApproveSchedule) {
      setShowApproveScheduleAlert(true)
      return
    }
    const response = await updateClinicScheduleStatus(
      staffId,
      clinicTime.id,
      ClinicScheduleStatus.Active,
    )
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    refetch(clinicTime.staffId, response.data.id)
    toast.success('Clinic Time Successfully Approved')
  }

  return (
    <Flex justify="start" px="1" gap="1" align="center">
      <PermissionAlert
        isOpen={showApproveScheduleAlert}
        message={ClinicAlertMessages.APPROVE_CLINIC_SCHEDULES_MESSAGE}
        onClose={() => setShowApproveScheduleAlert(false)}
      />
      {!showApproveButton && isAdminView && (
        <>
          {canUpdateSchedule && (
            <EditClinicScheduleDialog staffId={staffId} clinicTime={clinicTime}>
              <IconButton variant="ghost">
                <TableEditIcon height={18} />
              </IconButton>
            </EditClinicScheduleDialog>
          )}
        </>
      )}
      {(showApproveButton || !isAdminView) &&
        clinicTime.status === ClinicScheduleStatus.Pending && (
          <Button
            variant="outline"
            color="gray"
            size="1"
            className="text-black h-4 p-1"
            onClick={handleApproveClinicSchedule}
          >
            Approve
          </Button>
        )}
    </Flex>
  )
}

export { ActionCell }
