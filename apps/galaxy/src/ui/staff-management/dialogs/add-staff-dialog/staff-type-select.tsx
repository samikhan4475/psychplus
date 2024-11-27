import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getStaffRolesOrganizationAction } from '../../actions/get-organization-staff-roles'

const StaffTypeSelect = () => {
  const [staff, setStaff] = useState<SelectOptionType[]>([])
  useEffect(() => {
    getStaffRolesOrganizationAction().then((result) => {
      if (result.state === 'success') {
        setStaff(result.data.staffs)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staff}
        disabled
        field="staffType"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
