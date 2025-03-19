import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { LicenseStatus } from '../types'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="status"
        codeset={CODESETS.LicenseStatus}
        exclude={[LicenseStatus.Na]}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
