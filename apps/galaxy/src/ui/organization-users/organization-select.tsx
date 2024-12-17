'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput
} from '@/components'
import { SelectOptionType } from '@/types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getStaffRolesOrganizationAction } from '../staff-management/actions/get-organization-staff-roles'

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  useEffect(() => {
    getStaffRolesOrganizationAction().then((result) => {
      if (result.state === 'success') {
        setOrganizations(result.data.organizations)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <SelectInput
        options={organizations}
        field="organizationIds"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] min-w-[108px]"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
