'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SubstanceUseHxWidgetSchemaType } from '../substance-use-hx-schema'
import { REFFERAL_TREATMENT_OPTIONS } from './constants'

const FORM_KEY = 'referralTreatment'

const ReferralTreatmentBlock = () => {
  const form = useFormContext<SubstanceUseHxWidgetSchemaType>()
  const referralTreatment = form.watch(FORM_KEY)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Referral to Treatment</FormFieldLabel>
      <MultiSelectField
        defaultValues={referralTreatment ?? []}
        options={REFFERAL_TREATMENT_OPTIONS}
        onChange={(values) => form.setValue(FORM_KEY, values)}
      />
    </FormFieldContainer>
  )
}

export { ReferralTreatmentBlock }
