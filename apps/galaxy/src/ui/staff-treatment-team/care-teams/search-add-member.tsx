import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { getProvidersOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AsyncRowSelect } from '@/components/async-row-select'
import { useHasPermission } from '@/hooks'
import { ActionResult, SelectOptionType } from '@/types'
import { Option } from '@/ui/schedule/types'
import { addProviderCareTeams } from './actions/add-care-teams'
import { ADD_STAFF_PERMISSION_MESSAGE } from './constant'
import { useStore } from './store'
import { AddCareTeamMember, RecordStatus } from './types'

const SearchAddMemberSelect = ({
  isAdmin = false,
  staffId,
  setAlertInfo,
}: {
  isAdmin?: boolean
  staffId: string
  setAlertInfo: (alertInfo: { message: string; isOpen: boolean }) => void
}) => {
  const { fetchClinicalStaff, fetchAdmin, adminData, clinicalStaffData } =
    useStore((state) => ({
      fetchClinicalStaff: state.fetchClinicalStaff,
      fetchAdmin: state.fetchAdmin,
      adminData: state.adminData,
      clinicalStaffData: state.clinicalStaffData,
    }))
  const canAddStaff = useHasPermission('clickAddStaffButtonTreament')

  const disabledOptions = useMemo(() => {
    const data = isAdmin ? adminData : clinicalStaffData
    return data
      .map((item) => (item.staffId ? item.staffId.toString() : ''))
      .filter(Boolean)
  }, [adminData, clinicalStaffData])

  const onOptionClick = async (option: SelectOptionType) => {
    if (!option.value) return
    if (!canAddStaff) {
      setAlertInfo({ isOpen: true, message: ADD_STAFF_PERMISSION_MESSAGE })
      return
    }
    const payload: AddCareTeamMember = {
      isCareManager: isAdmin,
      isMedicalAssistant: !isAdmin,
      recordStatus: RecordStatus.Active,
      staffId: +option.value,
    }
    const result = await addProviderCareTeams(staffId, payload)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while adding member')
      return
    }
    toast.success('Member added successfully')
    if (isAdmin) {
      fetchAdmin(+staffId)
    } else {
      fetchClinicalStaff(+staffId)
    }
  }

  const fetchOptions: (
    value: string,
  ) => Promise<ActionResult<Option[]>> = async (value: string) => {
    const result = await getProvidersOptionsAction({
      name: value,
    })
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching options')
      return { error: result.error, state: 'error' }
    }
    return { data: result.data, state: 'success' }
  }

  const fetchDependencies = useMemo(() => [isAdmin], [isAdmin])

  return (
    <FormFieldContainer className="flex-row">
      <FormFieldLabel>Search & Add Member</FormFieldLabel>
      <AsyncRowSelect
        size="1"
        className="w-[280px]"
        allowMultiple
        label="Select Staff member"
        onRowClick={onOptionClick}
        fetchOptions={fetchOptions}
        disabledOptions={disabledOptions}
        fetchDependencies={fetchDependencies}
      />
    </FormFieldContainer>
  )
}

export { SearchAddMemberSelect }
