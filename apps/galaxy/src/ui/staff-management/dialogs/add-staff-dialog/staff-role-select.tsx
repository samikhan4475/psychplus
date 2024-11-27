import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getStaffRolesOrganizationAction } from '../../actions/get-organization-staff-roles'
import { SchemaType } from './schema'

const StaffRoleSelect = () => {
  const form = useFormContext<SchemaType>()
  const [roles, setRoles] = useState<SelectOptionType[]>([])
  useEffect(() => {
    getStaffRolesOrganizationAction().then((result) => {
      if (result.state === 'success') {
        setRoles(result.data.roles)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        onValueChange={(value) => {
          form.setValue('staffUserRoleIds.0', value)
          form.setValue('staffType', value)
        }}
        options={roles}
        disabled={roles.length === 0}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
