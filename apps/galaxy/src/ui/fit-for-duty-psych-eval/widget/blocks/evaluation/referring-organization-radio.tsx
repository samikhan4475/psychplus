'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectSection } from '@/components'
import { REFERRING_ORGANIZATION_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'
import { ReferringOrganizationInput } from './referring-organization-input'

const ReferringOrganizationRadio = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const referringOrganization = watch('referringOrganization')
  return (
    <Flex align="start" gap="2">
      <RadioSelectSection
        label="Referring Organization"
        field="referringOrganization"
        options={REFERRING_ORGANIZATION_OPTIONS}
        disabled={disabled}
        required
        lastOptionIndicator
        errorField="referringOrganization"
        shouldTriggerOnChange
      />
      {referringOrganization === 'other' && (
        <ReferringOrganizationInput disabled={disabled} />
      )}
      <FormFieldError name="referringOrganization" />
    </Flex>
  )
}
export { ReferringOrganizationRadio }
