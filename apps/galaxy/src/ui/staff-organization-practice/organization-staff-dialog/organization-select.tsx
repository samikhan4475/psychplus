'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getOrganizationOptionsAction } from '../actions'

const OrganizationSelect = () => {
  const form = useFormContext()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const organizationId = form.watch('organizationId')

  useEffect(() => {
    ;(async () => {
      if (organizationId) {
        setLoading(true)
        const result = await getOrganizationOptionsAction({
          organizationId,
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [organizationId])

  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Organization</FormFieldLabel>
      <SelectInput
        field="organizationId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        loading={loading}
        disabled
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
