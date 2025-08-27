import React, { useEffect, useState, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { SchemaType } from './schema'

const ScopeSelect = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.StaffScope)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const userActorCategory = form.watch('userActorCategory')
  const isProvider = userActorCategory === 'Provider'

  const options: SelectOptionType[] = useMemo(() => {
    return codes
      .toSorted((a, b) => {
        const aSortValue = a.attributes?.find(attr => attr.name === 'SortValue')?.value || '99'
        const bSortValue = b.attributes?.find(attr => attr.name === 'SortValue')?.value || '99'
        return aSortValue.localeCompare(bSortValue)
      })
      .map((code) => ({
        value: code.value,
        label: code.display,
      }))
  }, [codes])

  useEffect(() => {
    setDisabled(false)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!isProvider) {
      form.setValue('staffScope', '')
    }
  }, [isProvider, form])

  return (
    <FormFieldContainer>
      <FormFieldLabel>Scope</FormFieldLabel>
      <SelectInput
        onValueChange={(value) => {
          form.setValue('staffScope', value)
        }}
        options={options}
        field="staffScope"
        placeholder="Select"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        loading={loading}
        disabled={disabled || !isProvider}
      />
      <FormFieldError name="staffScope" />
    </FormFieldContainer>
  )
}

export { ScopeSelect } 