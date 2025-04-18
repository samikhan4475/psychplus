import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { ProfilePreferenceAlert } from '../../dialogs/clinic-schedule-dialog/profile-preference-alert'
import { updateClinicSchedule } from '../actions'
import { ClinicAlertMessages, ClinicScheduleStatus } from '../constants'
import { StatusClockPopover } from '../status-clock-popover'
import { useStore } from '../store'
import { ClinicSchedule } from '../types'

interface StatusCellProps extends PropsWithRow<ClinicSchedule> {
  showTextStatus?: boolean
}

const options = [
  {
    label: 'Error',
    value: ClinicScheduleStatus.Error,
  },
  {
    label: 'Pending',
    value: ClinicScheduleStatus.Pending,
  },
  {
    label: 'Inactive',
    value: ClinicScheduleStatus.Inactive,
  },
  {
    label: 'Active',
    value: ClinicScheduleStatus.Active,
  },
]

const StatusSelectCell = ({
  row: { original: clinicTime },
  showTextStatus = false,
}: StatusCellProps) => {
  const [showUpdateStatusAlert, setShowUpdateStatusAlert] = useState(false)
  const [showProfilePreferenceAlert, setShowProfilePreferenceAlert] =
    useState(false)
  const refetch = useStore((state) => state.refetch)
  const pathname = usePathname()
  const isAdminView = pathname.includes('staff')
  const canChangeStatus = useHasPermission('changeStatusClinicTimeTab')

  const handleUpdateStatus = async (newValue: string) => {
    if (!canChangeStatus) {
      setShowUpdateStatusAlert(true)
      return
    }
    if (newValue === ClinicScheduleStatus.Active) {
      setShowUpdateStatusAlert(true)
      return
    }
    const resp = await updateClinicSchedule(
      String(clinicTime.staffId),
      String(clinicTime.id),
      { ...clinicTime, status: newValue },
    )
    if (resp.state === 'error') {
      if (resp.status === 406 && resp.error.includes('Profile Preference')) {
        setShowProfilePreferenceAlert(true)
        return
      }
      toast.error(resp.error)
      return
    }
    toast.success('Clinic Schedule Successfully Updated')
    refetch(clinicTime.staffId, clinicTime.id)
  }

  return (
    <>
      <Flex gapX="1" className="min-w-32" align="center">
        <StatusClockPopover
          clinicTimeId={clinicTime.id}
          staffId={clinicTime.staffId}
        />
        {!isAdminView || showTextStatus ? (
          <Text size="1">{clinicTime.status}</Text>
        ) : (
          <SelectCell
            className="flex-1"
            value={clinicTime.status}
            options={options}
            onValueChange={handleUpdateStatus}
          />
        )}
      </Flex>
      <PermissionAlert
        isOpen={showUpdateStatusAlert}
        message={ClinicAlertMessages.UPDATE_STATUS_ALERT}
        onClose={() => setShowUpdateStatusAlert(false)}
      />
      <ProfilePreferenceAlert
        open={showProfilePreferenceAlert}
        onClose={() => {
          setShowProfilePreferenceAlert(false)
        }}
      />
    </>
  )
}

export { StatusSelectCell }
