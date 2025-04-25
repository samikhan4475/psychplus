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
import { getAllOrganizationsOptionsListAction } from './actions'

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('')
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllOrganizationsOptionsListAction({
        payload: {
          organizationId: id,
        },
      })
      if (result.state === 'success') {
        setOrganizations(result.data)
        const matchingOption = result.data.find((option) => option.value === id)
        if (matchingOption) {
          setSelectedOption(matchingOption.value)
        }
      }
    }
    fetchData()
  }, [id])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Organization Name</FormFieldLabel>
      <SelectInput
        options={organizations}
        value={selectedOption}
        field="id"
        disabled
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="organizationIds.[0]" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
