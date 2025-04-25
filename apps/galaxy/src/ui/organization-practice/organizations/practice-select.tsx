'use client'

import React, { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticeIdsAction } from '../actions/get-practice-ids'

const PracticeSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    ;(async () => {
      setDisabled(false)
      setLoading(true)
      const result = await getPracticeIdsAction()
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
      setLoading(false)
    })()
  }, [])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="ml-2 !text-1">Practice</FormFieldLabel>
      <SelectInput
        field="practiceId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-[101px] border border-solid !outline-none [box-shadow:none]"
        className="w-full"
        loading={loading}
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
