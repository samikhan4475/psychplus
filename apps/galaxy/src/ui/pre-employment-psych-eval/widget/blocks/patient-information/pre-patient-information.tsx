'use client'

import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import {
  DetailsField,
  RadioFieldWithError,
} from '@/ui/fit-for-duty-psych-eval/widget/components'
import {
  CONFIRM_OPTIONS,
  RELATIONSHIP_STATUS_OPTIONS,
} from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { LivingArrangementRadio } from './living-arrangement-radio'

const PrePatientInformation = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Patient information">
      <RadioFieldWithError
        field="relationshipStatus"
        label="Patient relationship status"
        options={RELATIONSHIP_STATUS_OPTIONS}
        disabled={disabled}
        required
      />
      <DetailsField
        field="currentCity"
        label="What city are they currently living in?"
        maxLength={20}
        disabled={disabled}
        className="min-h-5 !max-w-32"
        containerClassName="!flex-row"
      />
      <LivingArrangementRadio disabled={disabled} />
      <DetailsField
        field="placeOfBirth"
        label="Where was patient born (City, State)?"
        maxLength={50}
        disabled={disabled}
        className={DetailFieldClassName}
        containerClassName="!flex-row"
      />
      <DetailsField
        field="placeRaised"
        label="Where was patient raised (City, State)?"
        maxLength={50}
        disabled={disabled}
        className={DetailFieldClassName}
        containerClassName="!flex-row"
      />
      <RadioFieldWithError
        field="headInjuryHistory"
        label="History of head injury or life-threatening injuries/illnesses in the past five years."
        options={CONFIRM_OPTIONS}
        disabled={disabled}
        required
      />
    </BlockHeading>
  )
}
export { PrePatientInformation }
const DetailFieldClassName = 'min-h-5 !max-w-[300px]'
