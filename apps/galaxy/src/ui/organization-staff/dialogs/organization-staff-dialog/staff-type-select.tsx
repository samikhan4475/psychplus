import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { getOrganizationStaffRolesOptionsAction } from '../../actions'

const StaffTypeSelect = () => {
  const codes = useCodesetCodes(CODESETS.UserActorCategory)
  const form = useFormContext()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const staffUserRoleIds = form.watch('staffUserRoleIds')

  useEffect(() => {
    ;(async () => {
      if (staffUserRoleIds) {
        setDisabled(false)
        setLoading(true)
        const result = await getOrganizationStaffRolesOptionsAction({
          payload: {
            roleIds: [staffUserRoleIds],
          },
          category: true,
        })
        if (result.state === 'success') {
          form.setValue('staffType', result.data[0].value, {
            shouldValidate: true,
          })
          const match = codes.find(
            (code) => code.value === result.data[0].value,
          )
          if (match) {
            result.data[0].label = match.display
          }
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [staffUserRoleIds])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Staff Type</FormFieldLabel>
      <SelectInput
        field="staffType"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        className="w-full"
        loading={loading}
        disabled={disabled}
      />
      <FormFieldError name="staffType" />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
