'use client'

import {
  DetailsType,
  FormFieldContainer,
  FormFieldLabel,
  SelectableChipDetails,
} from '@/components'
import { REFFERAL_TREATMENT_OPTIONS } from './constants'

const FORM_KEY = 'referralTreatment'

const ReferralTreatmentBlock = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Referral to Treatment</FormFieldLabel>
      <SelectableChipDetails
        hideSelectedCount={true}
        type={'multi-select' as DetailsType}
        showIndicator={false}
        field={FORM_KEY}
        isOptionsChip={true}
        options={REFFERAL_TREATMENT_OPTIONS}
      />
    </FormFieldContainer>
  )
}

export { ReferralTreatmentBlock }
