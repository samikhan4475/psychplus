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
import { getAllOrganizationsOptionsListAction } from '../../actions'

const ToOrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getAllOrganizationsOptionsListAction({
        payload: {
          organizationId: id,
        },
      })
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
      setLoading(false)
    })()
  }, [id])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Organization</FormFieldLabel>
      <SelectInput
        field="toOrganizationId"
        options={organizations}
        value={id}
        disabled
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        loading={loading}
      />
      <FormFieldError name="toOrganizationId" />
    </FormFieldContainer>
  )
}

export { ToOrganizationSelect }
