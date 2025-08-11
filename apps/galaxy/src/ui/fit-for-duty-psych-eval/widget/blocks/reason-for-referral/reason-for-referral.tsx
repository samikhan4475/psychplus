'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, RadioSelectSection } from '@/components'
import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import {
  DID_OPTIONS,
  HAS_OPTIONS,
  INJURY_SEVERITY_OPTIONS,
} from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'
import { DateOfIncidentField } from './date-of-incident-field'
import { InjuryLocationInput } from './injury-location-input'

const ReasonForReferral = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()
  const sustainedInjury = form.watch('sustainedInjury')
  return (
    <BlockHeading title="Reason for this Referral">
      <DateOfIncidentField disabled={disabled} />
      <Flex align="start" gap="2">
        <RadioSelectSection
          field="sustainedInjury"
          label="Patient sustained an injury."
          options={DID_OPTIONS}
          disabled={disabled}
          required
          errorField="sustainedInjury"
          onChange={(val) => {
            if (val !== 'did') {
              form.setValue('injuryLocation', '')
              form.setValue('injurySeverity', '')
            } else {
              form.setValue('injurySeverity', 'minor')
            }
          }}
          shouldTriggerOnChange
        />

        {sustainedInjury === 'did' && (
          <Flex align="start" gap="2">
            <RadioFieldWithError
              field="injurySeverity"
              label="Injury severity"
              options={INJURY_SEVERITY_OPTIONS}
              required
              disabled={disabled}
            />
            <InjuryLocationInput disabled={disabled} />
          </Flex>
        )}
        <FormFieldError name="sustainedInjury" />
      </Flex>

      <RadioFieldWithError
        label="Patient has been on administrative duty?"
        field="onAdministrativeDuty"
        options={HAS_OPTIONS}
        disabled={disabled}
        required
      />
    </BlockHeading>
  )
}
export { ReasonForReferral }
