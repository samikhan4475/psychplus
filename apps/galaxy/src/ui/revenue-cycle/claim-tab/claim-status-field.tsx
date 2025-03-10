'use client'

import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Option } from '@/ui/schedule/types'
import { SchemaType } from './claims-list-filter-form'

const ClaimStatusDropDown = () => {
  const form = useFormContext<SchemaType>()
  const claimStatuses = useCodesetCodes(CODESETS.ClaimStatus)
  const claimStatusCodes = useWatch({
    control: form.control,
    name: 'claimStatusCodes',
  })

  const options = useMemo<Option[]>(() => {
    return [
      ...(claimStatuses?.map(({ value, display }) => ({
        value,
        label: display,
      })) ?? []),
    ]
  }, [claimStatuses])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <MultiSelectField
        defaultValues={claimStatusCodes}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('claimStatusCodes', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={false}
        disabled={false}
        includeAllOption={true}
      />
    </FormFieldContainer>
  )
}

export { ClaimStatusDropDown }
