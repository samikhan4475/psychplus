'use client'

import { useEffect, useState } from 'react'
import { ActionResult } from '@/api'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getVisitTypesAction } from '../actions/get-visit-types'

const VisitTypeDropdown = () => {
  const [visitTypesResult, setVisitTypesResult] =
    useState<ActionResult<SelectOptionType[]>>()

  useEffect(() => {
    getVisitTypesAction().then(setVisitTypesResult)
  }, [])

  const isSuccess = visitTypesResult?.state === 'success'
  const options = isSuccess ? visitTypesResult?.data : []
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[200px]'
export { VisitTypeDropdown }
