import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions, useHasPermission } from '@/hooks'
import {
  UpdateCareTeamMemberParams,
  updateProviderCareTeamsStatus,
} from '../actions/update-care-teams-status'
import {
  DEACTIVATION_RULE_FOR_ADMIN,
  DEACTIVATION_RULE_FOR_CSS,
  STATUS_PERMISSION_MESSAGE,
} from '../constant'
import { StatusClockPopover } from '../status-clock-popover'
import { useStore } from '../store'
import { CareTeam, RecordStatus } from '../types'

const StatusCell = ({
  row: { original },
  isProfileView = false,
  providerStaffId,
  setAlertInfo,
}: PropsWithRow<CareTeam> & {
  isProfileView?: boolean
  providerStaffId: string
  setAlertInfo: (alertInfo: { message: string; isOpen: boolean }) => void
}) => {
  const { adminData, clinicalStaffData, fetchClinicalStaff, fetchAdmin } =
    useStore((state) => ({
      adminData: state.adminData,
      clinicalStaffData: state.clinicalStaffData,
      fetchClinicalStaff: state.fetchClinicalStaff,
      fetchAdmin: state.fetchAdmin,
    }))
  const options = useCodesetOptions(CODESETS.LicenseStatus, undefined, [
    'Na',
    'Deleted',
    'Archived',
  ])
  const canChangeStatus = useHasPermission('clickEditStatusBtn')
  const { careTeamId, recordStatus, isCareManager } = original

  const handleStatusChange = async (value: string) => {
    if (!canChangeStatus && !isProfileView) {
      setAlertInfo({ isOpen: true, message: STATUS_PERMISSION_MESSAGE })
      return
    }
    const data = isCareManager ? adminData : clinicalStaffData
    if (value === RecordStatus.Inactive && isCareManager) {
      const canChangeToInactive =
        data.filter((a) => a.recordStatus === RecordStatus.Active).length > 1
      if (!canChangeToInactive) {
        setAlertInfo({ isOpen: true, message: DEACTIVATION_RULE_FOR_ADMIN })
        return
      }
    }
    if (value === RecordStatus.Inactive && !isCareManager) {
      const canChangeToInactive =
        data.filter((a) => a.recordStatus === RecordStatus.Active).length > 2
      if (!canChangeToInactive) {
        setAlertInfo({ isOpen: true, message: DEACTIVATION_RULE_FOR_CSS })
        return
      }
    }

    const payload: UpdateCareTeamMemberParams = {
      staffId: providerStaffId,
      careTeamId,
      recordStatus: value as RecordStatus,
    }
    const result = await updateProviderCareTeamsStatus(payload)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while adding member')
      return
    }
    toast.success('Status updated successfully')
    if (isCareManager) {
      fetchAdmin(+providerStaffId)
    } else {
      fetchClinicalStaff(+providerStaffId)
    }
  }

  if (isProfileView) {
    return (
      <>
        <StatusClockPopover providerId={+providerStaffId} careTeam={original} />
        <TextCell>{recordStatus}</TextCell>
      </>
    )
  }

  return (
    <>
      <StatusClockPopover providerId={+providerStaffId} careTeam={original} />
      <SelectCell
        value={recordStatus}
        options={options}
        onValueChange={handleStatusChange}
        className="flex-1"
      />
    </>
  )
}

export { StatusCell }
