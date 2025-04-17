'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const PageFeatureSelect = () => {
  const form = useFormContext()
  const codes = useCodesetCodes(CODESETS.PermissionSection)
  const options = useMemo(() => {
    let optionsList = codes.map((code) => ({
      label: code.display,
      value: code.value,
    }))
    optionsList = [
      {
        label: 'All',
        value: 'all',
      },
      ...optionsList,
    ]
    return optionsList
  }, [codes])

  return (
    <FormFieldContainer className="flex-row items-center">
      <FormFieldLabel>Page/Feature</FormFieldLabel>
      <SelectInput
        field="permissionSection"
        options={options}
        buttonClassName="min-w-[200px]"
        defaultValue={form.watch('permissionSection')}
      />
    </FormFieldContainer>
  )
}

export { PageFeatureSelect }
