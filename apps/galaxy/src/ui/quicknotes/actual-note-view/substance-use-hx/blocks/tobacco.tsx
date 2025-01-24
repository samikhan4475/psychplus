'use client'

import { SharedCode } from '@/types'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'
import { mapValuesToLabels } from '@/utils'
import { LabelAndValue } from '../../shared'

interface TobaccoProps {
  data: SubstanceUseHxWidgetSchemaType
  counsellingCodeset: SharedCode[]
  tobaccoTreatmentCodeset: SharedCode[]
}

const Tobacco = ({
  data,
  tobaccoTreatmentCodeset,
  counsellingCodeset,
}: TobaccoProps) => {
  const {
    smokePacks,
    smokingCessationOption,
    tobaccoChewSmoke,
    counselingOption,
    smokingCessationDiscussionDuration,
    otherTobacco,
  } = data
  const isSmoke = tobaccoChewSmoke === 'smoke'

  if (!isSmoke) {
    return null
  }

  const smokingCessationLabel = smokingCessationOption
    ? `"${mapValuesToLabels(
        [smokingCessationOption] as string[],
        tobaccoTreatmentCodeset,
      )}"`
    : ''

  const counselingOptionLabel = counselingOption
    ? `"${mapValuesToLabels(
        [counselingOption] as string[],
        counsellingCodeset,
      )}"`
    : ''

  const smokingCessationText = `I have reviewed the risks of continued smoking with the patient and offered
                Smoking Cessation Options ${smokingCessationLabel} and
                Counseling Options ${counselingOptionLabel}.`
  return (
    <>
      {smokePacks && (
        <LabelAndValue label="Smoke:" value={`Packs a day: ${smokePacks}`} />
      )}
      <LabelAndValue value={smokingCessationText} />
      {smokingCessationDiscussionDuration && (
        <LabelAndValue
          label="Discussed smoking cessation for:"
          value={smokingCessationDiscussionDuration}
        />
      )}
      {otherTobacco && <LabelAndValue label="Other:" value={otherTobacco} />}
    </>
  )
}

export { Tobacco }
