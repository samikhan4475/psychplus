'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getAllRolesListOptionsAction } from './actions'

const RoleSelect = () => {
  const { roleId } = useParams<{ roleId: string }>()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (roleId) {
        setLoading(true)
        const result = await getAllRolesListOptionsAction({
          payload: {
            roleIds: [roleId],
          },
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [roleId])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Role</FormFieldLabel>
      <SelectInput
        field="roleId"
        options={organizations}
        disabled
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        loading={loading}
      />
      <FormFieldError name="organizationIds.[0]" />
    </FormFieldContainer>
  )
}

export { RoleSelect }
