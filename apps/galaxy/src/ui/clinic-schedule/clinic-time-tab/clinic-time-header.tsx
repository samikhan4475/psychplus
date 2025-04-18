import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'
import { CircleCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { TabContentHeading } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { PermissionAlert } from '@/ui/schedule/shared'
import { useStore } from '../clinic-time-tab/store'
import { ActiveVisitDialog } from '../shared'
import { updateClinicScheduleStatus } from './actions'
import { AddClinicScheduleButton } from './add-clinic-schedule-button'
import { ClinicAlertMessages, ClinicScheduleStatus } from './constants'
import { PropsWithStaffId } from './types'

const ClinicTimeHeader = ({ staffId }: PropsWithStaffId) => {
  const { staff } = useGlobalStore((store) => ({
    staff: store.staffResource,
  }))
  const { data, refetch } = useStore((store) => ({
    data: store.data,
    refetch: store.refetch,
  }))
  const [showApproveScheduleAlert, setShowApproveScheduleAlert] =
    useState(false)
  const [showActiveClinicAlert, setShowActiveClinicAlert] = useState(false)

  const pathname = usePathname()
  const isAdminView = pathname.includes('staff')
  const hasPermissionToApproveSchedule = useHasPermission(
    'clickApprovedClinicTimeTab',
  )
  const hasPermissionToClickOnActiveClinicButton = useHasPermission(
    'clickActiveVisitClinicTimeTab',
  )

  const handleApproveAll = async () => {
    const pendingClinicSchedules = data?.filter(
      (el) => el.status === ClinicScheduleStatus.Pending,
    )
    if (!pendingClinicSchedules) return
    if (!hasPermissionToApproveSchedule) {
      setShowApproveScheduleAlert(true)
      return
    }

    const allPendingClinicScheduleApprovePromises = pendingClinicSchedules.map(
      (el) =>
        updateClinicScheduleStatus(
          staff.id,
          el.id,
          ClinicScheduleStatus.Active,
        ),
    )

    const allPendingClinicTimeApprove = await Promise.all(
      allPendingClinicScheduleApprovePromises,
    )
    const failedCalls = allPendingClinicTimeApprove.filter(
      (el) => el.state === 'error',
    )

    if (!failedCalls.length && staff) {
      const successCalls = allPendingClinicTimeApprove.filter(
        (el) => el.state === 'success',
      )
      refetch(Number(staff.id), successCalls[0].data.id)
      toast.success('All Pending Clinic Times Approved')
    }
  }

  return (
    <>
      <TabContentHeading title="Clinic Time" className="border-white flex-1">
        <Flex flexGrow="1" justify="end" align="center">
          <Flex align="center" gap="2">
            {hasPermissionToClickOnActiveClinicButton ? (
              <ActiveVisitDialog filters={{ staffId: Number(staffId) }} />
            ) : (
              <Button
                variant="outline"
                color="gray"
                size="1"
                className={`!isDisabled && 'bg-transparent text-black'`}
                onClick={() => setShowActiveClinicAlert(true)}
              >
                Active Clinic Visits
              </Button>
            )}
            {!isAdminView ? (
              <Button
                variant="solid"
                highContrast
                size="2"
                onClick={handleApproveAll}
              >
                <CircleCheck width={16} height={16} />
                Approve All
              </Button>
            ) : (
              <AddClinicScheduleButton staffId={staffId} />
            )}
          </Flex>
        </Flex>
      </TabContentHeading>
      <PermissionAlert
        isOpen={showApproveScheduleAlert}
        message={ClinicAlertMessages.APPROVE_CLINIC_SCHEDULES_MESSAGE}
        onClose={() => setShowApproveScheduleAlert(false)}
      />
      <PermissionAlert
        isOpen={showActiveClinicAlert}
        message={ClinicAlertMessages.CLICK_ACTIVE_VISIT_CLINIC}
        onClose={() => setShowActiveClinicAlert(false)}
      />
    </>
  )
}

export { ClinicTimeHeader }
