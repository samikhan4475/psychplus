'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, RadioSelectSection } from '@/components'
import { AdditionalTherapyDetailBlock } from '@/ui/therapy/therapy-widget/blocks/additional-therapy-detail'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/blocks/session-participants'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/blocks/time-spent'
import { PsychoAnalysisBlock } from './psychoanalysis-block'
import { TherapyDetail } from './therapy-details'

const THERAPY_PSYCHOANALYSIS_OPTIONS = [
  { label: 'Therapy', value: 'therapy' },
  { label: 'Psychoanalysis', value: 'psychoanalysis' },
  { label: 'Neither', value: 'neither' },
]

const DEFAULT_PSYCHOANALYSIS_DETAIL =
  'The patient displayed transference that may be the result of unconscious conflicts. The provider encouraged the patient to reflect on past experiences that could be impacting the patient’s life. The provider further explored repressed thoughts with the patient to help the patient become aware of the root causes of their psychological distress. Continued support and discussion of the transference are recommended for continued growth.'

const TherapyPsychoAnalysisBlock = () => {
  const { watch } = useFormContext()
  const therapyPsychoanalysis = watch('therapyPsychoanalysis')

  return (
    <Flex
      direction="column"
      py="2"
      px="2"
      className="rounded-3 border border-gray-7"
      gap="2"
    >
      <Flex align="center" gap="2">
        <CheckboxInput field="therapy" checked={watch('therapy')} />
        <Text className="cursor-default" weight="medium">
          Therapy/Psychoanalysis
        </Text>
      </Flex>
      {watch('therapy') && (
        <>
          <RadioSelectSection
            field="therapyPsychoanalysis"
            options={THERAPY_PSYCHOANALYSIS_OPTIONS}
          />
          {therapyPsychoanalysis === 'therapy' && (
            <>
              <Text className="cursor-default" weight="medium">
                Therapy Details
              </Text>
              <TherapyTimeSpentBlock />
              <TherapySessionParticipantsBlock />
              <TherapyTableBlock />
              <AdditionalTherapyDetailBlock />
            </>
          )}
          {therapyPsychoanalysis === 'psychoanalysis' && (
            <>
              <PsychoAnalysisBlock />
              <TherapyDetail
                field="additionalPsychoAnalysisDetail"
                label="Additional Psychoanalysis Details"
                defaultValue={DEFAULT_PSYCHOANALYSIS_DETAIL}
              />
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export { TherapyPsychoAnalysisBlock }
