import { useMemo } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { LicenseStatus } from '../types'

const StatusSelect = () => {
  const codes = useCodesetOptions(CODESETS.LicenseStatus)
  const statusOptions = useMemo(() => {
    return [{ label: 'Select', value: 'NotSet' }, ...codes].filter(
      (code) => code.value !== LicenseStatus.Na,
    )
  }, [])
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="status"
        size="1"
        options={statusOptions}
        buttonClassName="h-6 w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
