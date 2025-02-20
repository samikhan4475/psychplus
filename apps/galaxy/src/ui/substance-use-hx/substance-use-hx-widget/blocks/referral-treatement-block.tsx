'use client'

import {
  DetailsType,
  FormFieldContainer,
  FormFieldLabel,
  SelectableChipDetails,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { mapCodesetToOptions } from '@/utils'

const FORM_KEY = 'referralTreatment'

const ReferralTreatmentBlock = () => {
  const REFFERAL_TREATMENT_OPTIONS = mapCodesetToOptions(
    useCodesetCodes(CODESETS.ReferralTreatment),
  )

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1" required>
        Referral to Treatment
      </FormFieldLabel>
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
