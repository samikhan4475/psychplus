'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  DropdownMenuClientSideSearch,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
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
      <DropdownMenuClientSideSearch
        initialValue={form.watch('permissionSection')}
        options={options}
        field="permissionSection"
      />
    </FormFieldContainer>
  )
}

export { PageFeatureSelect }
