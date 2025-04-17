'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getAllOrganizationsOptionsListAction } from './actions'

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      const result = await getAllOrganizationsOptionsListAction({
        payload: {
          organizationId: id,
        },
      })
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
    })()
  }, [id])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <SelectInput
        field="organizationId"
        options={organizations}
        disabled
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
