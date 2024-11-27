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

const PracticeSelect = () => {
  const [practices, setPractices] = useState<SelectOptionType[]>([])
  useEffect(() => {
    getStaffRolesOrganizationAction().then((result) => {
      if (result.state === 'success') {
        setPractices(result.data.practices)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <SelectInput
        disabled={practices.length === 0}
        options={practices}
        field="practiceIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="practiceIds.[0]" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
