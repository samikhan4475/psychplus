'use client'

import { useParams } from 'next/navigation'
import { getOrganizationStaffOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { StaffSelectCommon } from '../organization-staff-roles/shared/staff-select-common'
import { useStore } from './store'

const OrganizationSelect = () => {
  const { search, setSelectedStaffId } = useStore((state) => ({
    search: state.search,
    setSelectedStaffId: state.setSelectedStaffId,
  }))
  const { id } = useParams<{ id: string }>()

  const onChange = (option: SelectOptionType) => {
    setSelectedStaffId(option.value)
    search(id, option.value)
  }

  const fetchOptions = (value: string) => {
    return getOrganizationStaffOptionsAction({
      practicesIds: [id],
      name: value,
    })
  }

  return <StaffSelectCommon fetchOptions={fetchOptions} onChange={onChange} />
}

export { OrganizationSelect }
