import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getOrganizationStaffRolesOptionsAction } from '../../actions'
import { SchemaType } from './schema'

const StaffRoleSelect = () => {
  const form = useFormContext<SchemaType>()
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
  }, [id])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Permission group</FormFieldLabel>
      <SelectInput
        onValueChange={(value) => {
          form.setValue('staffUserRoleIds.0', value)
        }}
        options={organizations}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        loading={loading}
        disabled={disabled}
      />
      <FormFieldError name="staffUserRoleIds.[0]" />
    </FormFieldContainer>
  )
}

export { StaffRoleSelect }
