import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AsyncRowSelect } from '@/components/async-row-select'
import { ActionResult, SelectOptionType } from '@/types'
import { Option } from '@/ui/schedule/types'
import { searchPatientsAction } from '@/ui/visit/actions'
import { transferPatientsToPrimaryProvider } from './client-actions/transfer-primary-providers'
import { transferPatientsToSecondaryProvider } from './client-actions/transfer-secondary-providers'
import { useStore } from './store'

const SearchAddPatientSelect = ({
  isPrimary = false,
  staffId,
  providerType,
}: {
  isPrimary?: boolean
  staffId: number
  providerType: string
}) => {
  const { fetchPatientsOfProvider, primaryPatients, secondaryPatients } =
    useStore((state) => ({
      fetchPatientsOfProvider: state.fetchPatientsOfProvider,
      primaryPatients: state.primaryPatients,
      secondaryPatients: state.secondaryPatients,
    }))
  const data = isPrimary ? primaryPatients : secondaryPatients

  const disabledOptions = useMemo(() => {
    return data
      .map((item) => (item.patientId ? item.patientId.toString() : ''))
      .filter(Boolean)
  }, [data])

  const onOptionClick = async (option: SelectOptionType) => {
    if (!option.value) return
    const value = +option.value
    let res
    if (isPrimary) {
      const payload = {
        staffId: `${staffId}`,
        patientIds: [value],
        providerType: providerType,
      }
      res = await transferPatientsToPrimaryProvider(payload)
    } else {
      const payload = {
        sourceStaffId: null,
        targetStaffId: `${staffId}`,
        patientIds: [value],
        providerType,
      }
      res = await transferPatientsToSecondaryProvider(payload)
    }

    if (res.state === 'error') {
      toast.error(res.error ?? 'Error while adding member')
      return
    }
    toast.success('Member added successfully')
    fetchPatientsOfProvider(staffId, isPrimary, providerType)
  }

  const fetchOptions: (
    value: string,
  ) => Promise<ActionResult<Option[]>> = async (value: string) => {
    const result = await searchPatientsAction({
      name: value,
    })
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching options')
      return { error: result.error, state: 'error' }
    }
    return {
      data: result.data.map((item) => {
        const fullName = [item.firstName, item.middleName, item.lastName]
          .filter(Boolean)
          .join(' ')
        return {
          label: fullName,
          value: item.id.toString(),
        }
      }),
      state: 'success',
    }
  }

  return (
    <FormFieldContainer className="flex-row">
      <FormFieldLabel>Search & Add Member</FormFieldLabel>
      <AsyncRowSelect
        size="1"
        className="w-[280px]"
        label="Select Patient"
        onRowClick={onOptionClick}
        fetchOptions={fetchOptions}
        disabledOptions={disabledOptions}
      />
    </FormFieldContainer>
  )
}

export { SearchAddPatientSelect }
