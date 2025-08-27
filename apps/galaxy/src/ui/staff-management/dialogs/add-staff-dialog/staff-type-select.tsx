import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { USER_TYPE_GROUPING_CODE_MAPPING } from '@/enum'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { SchemaType } from './schema'

const SubRoleSelect = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.StaffType)
  const userActorCategory = form.watch('userActorCategory')

  const allSubRoleOptions: SelectOptionType[] = useMemo(
    () => {
      const options = codes.map((code) => {
        const sortValueAttr = code.attributes?.find(attr => attr.name === 'SortValue')
        const sortValue = sortValueAttr ? parseInt(sortValueAttr.value, 10) : 0
        
        return {
          value: code.value,
          label: code.display,
          sortValue,
        }
      })
      
      return options.sort((a, b) => a.sortValue - b.sortValue)
    },
    [codes],
  )

  const filteredOptions = useMemo(() => {
    if (!userActorCategory) return []

    const targetGroupingCode =
      USER_TYPE_GROUPING_CODE_MAPPING[
        userActorCategory as keyof typeof USER_TYPE_GROUPING_CODE_MAPPING
      ]
    if (!targetGroupingCode) return allSubRoleOptions

    return allSubRoleOptions.filter((option) => {
      const matchingCode = codes.find((code) => code.value === option.value)
      return matchingCode?.groupingCode === targetGroupingCode
    })
  }, [userActorCategory, allSubRoleOptions, codes])

  useEffect(() => {
    if (userActorCategory) {
              form.setValue('specialtyCodes', '')
    }
  }, [userActorCategory])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Sub Role</FormFieldLabel>
      <SelectInput
        options={filteredOptions}
        field="specialtyCodes"
        placeholder="Select Sub Role"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        disabled={!userActorCategory}
      />
      <FormFieldError name="specialtyCodes" />
    </FormFieldContainer>
  )
}

export { SubRoleSelect }
