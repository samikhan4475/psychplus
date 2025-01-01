'use client'

import { useEffect, useState } from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getOrganizationOptionsAction } from '@/ui/patient-lookup/actions'

const OrganizationSelect = () => {
  const [organizationsOptions, setOrganizationsOptions] = useState<
    SelectOptionType[]
  >([])

  useEffect(() => {
    getOrganizationOptionsAction().then((organizationResult) => {
      if (organizationResult.state === 'success') {
        setOrganizationsOptions(organizationResult.data)
      }
    })
  }, [])

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <DropdownSelect field="organizationId" options={organizationsOptions} />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
