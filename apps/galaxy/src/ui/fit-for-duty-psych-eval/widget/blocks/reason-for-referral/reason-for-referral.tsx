'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'
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

      <FormFieldContainer className="flex-row items-center gap-1">
        <RadioSelectSection
          field="onAdministrativeDuty"
          label="Patient has been on administrative duty?"
          options={HAS_OPTIONS}
          disabled={disabled}
          required
          errorField="onAdministrativeDuty"
          shouldTriggerOnChange
        />
        <FormFieldError name="onAdministrativeDuty" />
      </FormFieldContainer>
    </BlockHeading>
  )
}
export { ReasonForReferral }
