'use client'

import { useEffect, useState } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { useFormContext } from 'react-hook-form'
import { getCodeSetAction } from '@/actions'
import { FormField } from '@/components-v2'
import { SelectInput } from '@/components-v2/select-input'
import { PSYCH_PLUS_ASSIGNING_AUTHORITY } from '@/constants'
import { SelectOptionType } from '@/features/codes/types'
import { SchemaType } from './schema'

interface FacilitySelectProps {
  referrerShortName?: string
}

const FacilitySelect = ({ referrerShortName }: FacilitySelectProps) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const requestedStateCode = watch('patientContactDetails.addresses.0.state')
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!referrerShortName || !requestedStateCode) {
      setOptions([])
      setValue('referrerFacility', '')
      return
    }

    setLoading(true)

    getCodeSetAction({
      authority: PSYCH_PLUS_ASSIGNING_AUTHORITY,
      codeset: CODESETS.ReferrerFacility,
      filters: {
        groupingCodeStartsWith: referrerShortName,
        codeAttributeNameContains: 'State',
        codeAttributeValue: requestedStateCode,
      },
      orderBy: 'code asc',
      includeExtraDetails: false,
    }).then((res) => {
      if (res.state === 'success') {
        const codes = Array.isArray(res.data?.codes) ? res?.data?.codes : []
        const opts = codes?.map(({ displayName }) => ({
          value: displayName,
          label: displayName,
        }))
        setOptions(opts)
      } else {
        setOptions([])
      }
      setValue('referrerFacility', '')
      setLoading(false)
    })
  }, [referrerShortName, requestedStateCode])

  return (
    <FormField containerClassName="flex-1" name="time" label="Facility Name">
      <SelectInput
        field="referrerFacility"
        placeholder="--Please Select--"
        loading={loading}
        options={options}
        buttonClassName="font-regular h-[38px] border-pp-gray-2  text-gray-12 text-2 w-full 
        border border-solid !outline-none [box-shadow:none] 
        bg-white  [&_span]:bg-red-500 disabled:bg-gray-3"
        variant="soft"
        size="1"
        disabled={loading || !requestedStateCode?.length}
      />
    </FormField>
  )
}

export { FacilitySelect }
