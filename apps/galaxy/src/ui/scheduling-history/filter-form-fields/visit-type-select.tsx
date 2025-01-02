'use client'

import { useEffect, useState } from 'react'
import { ActionResult } from '@/api'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getVisitTypesAction } from '../actions'
import { useStore } from '../store'
import { SelectOptionType } from '../types'

const VisitTypeSelect = () => {
  const [visitTypesResult, setVisitTypesResult] =
    useState<ActionResult<SelectOptionType[]>>()
  const { setVisitTypes } = useStore()

  useEffect(() => {
    getVisitTypesAction().then(setVisitTypesResult)
  }, [])

  const isSuccess = visitTypesResult?.state === 'success'
  const options = isSuccess ? visitTypesResult?.data : []

  useEffect(() => {
    setVisitTypes(options)
  }, [visitTypesResult])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitTypeCode"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]'
export { VisitTypeSelect }
