'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CircleCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { PermissionAlert } from '@/ui/schedule/shared'
import { isPrescriber } from '@/utils'
import { updateClinicScheduleStatus } from '../../clinic-time-tab/actions'
import { ClinicTimeTable } from '../../clinic-time-tab/clinic-time-table'
import {
  ClinicAlertMessages,
  ClinicScheduleStatus,
} from '../../clinic-time-tab/constants'
import { useStore } from '../../clinic-time-tab/store'

const PendingClinicSchedule = () => {
  const [showDialog, setShowDialog] = useState(true)
  const [showApproveScheduleAlert, setShowApproveScheduleAlert] =
    useState(false)
  const staffResource = useGlobalStore((store) => store.staffResource)
  const { pendingClinicSchedules, fetchPendingClinicSchedules, refetch } =
    useStore((store) => ({
      pendingClinicSchedules: store.pendingClinicSchedules,
      fetchPendingClinicSchedules: store.fetchPendingClinicSchedules,
      refetch: store.refetch,
    }))

  const isProvider = isPrescriber(staffResource)
  const hasPermissionToApproveSchedule = useHasPermission(
    'clickApprovedClinicTimeTab',
  )
  const pendingClinicSchedulesWithApproveOption = pendingClinicSchedules?.map(
    (el) => ({ ...el, showApproveButton: true, showTextStatus: true }),
  )

  const openDialogCheck =
    showDialog &&
    isProvider &&
    !!pendingClinicSchedulesWithApproveOption?.length

  const handleApproveAll = async () => {
    if (!pendingClinicSchedulesWithApproveOption) return
    if (!hasPermissionToApproveSchedule) {
      setShowApproveScheduleAlert(true)
      return
    }
    const allPendingClinicScheduleApprovePromises =
      pendingClinicSchedulesWithApproveOption.map((el) =>
        updateClinicScheduleStatus(
          staffResource.id,
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
    if (failedCalls.length) {
      toast.error(failedCalls[0].error)
      return
    }
    if (!failedCalls.length && staffResource) {
      const successCalls = allPendingClinicTimeApprove.filter(
        (el) => el.state === 'success',
      )
      refetch(Number(staffResource.id), successCalls[0].data.id)
      toast.success('All Pending Clinic Times Approved')
    }
  }
  const closeDialog = () => setShowDialog(false)

  useEffect(() => {
    if (!isProvider) return
    const fetchData = async () => {
      await fetchPendingClinicSchedules(staffResource.id)
    }
    fetchData()
  }, [fetchPendingClinicSchedules, isProvider, staffResource])

  return (
    <Dialog.Root open={openDialogCheck}>
      <Dialog.Content className="max-w-[80%]" onInteractOutside={closeDialog}>
        <Flex justify="between">
          <Dialog.Title>Pending Clinic Time Approval</Dialog.Title>
          <CloseDialogTrigger onClick={closeDialog} />
        </Flex>
        {pendingClinicSchedulesWithApproveOption && (
          <ClinicTimeTable data={pendingClinicSchedulesWithApproveOption} />
        )}
        <Flex justify="end" mt="2">
          <Flex gap="2">
            <Button
              variant="outline"
              color="gray"
              size="2"
              className="text-black"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              highContrast
              size="2"
              onClick={handleApproveAll}
            >
              <CircleCheck width={16} height={16} />
              Approve All
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
      <PermissionAlert
        isOpen={showApproveScheduleAlert}
        message={ClinicAlertMessages.APPROVE_CLINIC_SCHEDULES_MESSAGE}
        onClose={() => setShowApproveScheduleAlert(false)}
      />
    </Dialog.Root>
  )
}

export { PendingClinicSchedule }
