'use client'

import { SharedCode } from '@/types'
import { mapValuesToLabels } from '@/utils'
import { LabelAndValue } from '../../shared'

interface TobaccoProps {
  data: {
    smokePacks?: string
    smokingCessationOption?: string
    tobaccoChewSmoke?: string
    counselingOption?: string
    smokingCessationDiscussionDuration?: string
    otherTobacco?: string
  }
  tobaccoTreatmentCodeset: SharedCode[]
  counsellingCodeset: SharedCode[]
}

const Tobacco = ({
  data,
  tobaccoTreatmentCodeset,
  counsellingCodeset,
}: TobaccoProps) => {
  const isSmoke = data.tobaccoChewSmoke === 'smoke' && data.smokePacks

  const smokingCessation = `I have reviewed the risks of continued smoking with the patient and offered
                Smoking Cessation Options ${
                  mapValuesToLabels(
                    [data.smokingCessationOption] as string[],
                    tobaccoTreatmentCodeset,
                  ) || ''
                } and
                Counseling Options ${
                  mapValuesToLabels(
                    [data.counselingOption] as string[],
                    counsellingCodeset,
                  ) || ''
                }.`
  return (
    <>
      {isSmoke && (
        <LabelAndValue
          label="Smoke:"
          value={`Packs a day: ${data.smokePacks}`}
        />
      )}
      <LabelAndValue value={smokingCessation} />
      <LabelAndValue
        label="Discussed smoking cessation for:"
        value={data.smokingCessationDiscussionDuration}
      />
      <LabelAndValue label="Other:" value={data.otherTobacco} />
    </>
  )
}

export { Tobacco }
