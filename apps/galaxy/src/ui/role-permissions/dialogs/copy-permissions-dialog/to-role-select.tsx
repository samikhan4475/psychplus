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
import { getAllRolesListOptionsAction } from '../../actions'

const ToRoleSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const { roleId } = useParams<{ roleId: string }>()

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
        field="toRoleId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        disabled
        loading={loading}
      />
      <FormFieldError name="toRoleId" />
    </FormFieldContainer>
  )
}

export { ToRoleSelect }
