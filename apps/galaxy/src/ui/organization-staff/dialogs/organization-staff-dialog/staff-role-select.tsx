import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getOrganizationStaffRolesOptionsAction } from '../../actions'

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
        },
      })
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        field="staffUserRoleIds"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        className="w-full"
        loading={loading}
        disabled={disabled}
      />
      <FormFieldError name="staffUserRoleIds" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
