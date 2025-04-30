import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getOrganizationStaffRolesOptionsAction } from './actions'

const StaffRoleSelect = () => {
  const { id } = useParams<{ id: string }>()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    ;(async () => {
      setDisabled(false)
      setLoading(true)
      const result = await getOrganizationStaffRolesOptionsAction({
        payload: {
          organizationId: id,
          IsIncludeOrganizationSpecific: !!id,
        },
      })
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Role</FormFieldLabel>
      <SelectInput
        options={organizations}
        disabled={disabled}
        placeholder="Select"
        field="staffUserRoleIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        loading={loading}
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
