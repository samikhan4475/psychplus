'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, RadioSelectSection } from '@/components'
import { AdditionalTherapyDetailBlock } from '@/ui/therapy/therapy-widget/blocks/additional-therapy-detail'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/individual/blocks/session-participants'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/individual/blocks/time-spent'
import { PsychoAnalysisBlock } from './psychoanalysis-block'
import { TherapyDetail } from './therapy-details'

const THERAPY_PSYCHOANALYSIS_OPTIONS = [
  { label: 'Therapy', value: 'therapy' },
  { label: 'Psychoanalysis', value: 'psychoanalysis' },
  { label: 'Neither', value: 'neither' },
]

const TherapyPsychoAnalysisBlock = () => {
  const { watch, setValue } = useFormContext()
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
            onChange={(value) => {
              if (value !== 'therapy') {
                setValue('therapyTimeSpent', '')
                setValue('timeRangeOne', '')
                setValue('timeRangeTwo', '')
                setValue('timeRangeThree', '')
              }
            }}
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
              />
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export { TherapyPsychoAnalysisBlock }
