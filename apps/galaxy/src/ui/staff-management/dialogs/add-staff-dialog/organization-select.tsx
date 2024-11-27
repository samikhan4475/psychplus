'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getStaffRolesOrganizationAction } from '../../actions/get-organization-staff-roles'

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
    <FormFieldContainer>
      <FormFieldLabel required>Organization</FormFieldLabel>
      <SelectInput
        options={organizations}
        disabled={organizations.length === 0}
        field="organizationIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="organizationIds.[0]" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
