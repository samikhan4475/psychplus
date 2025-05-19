'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, RadioSelectSection } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { AdditionalTherapyDetailBlock } from '@/ui/therapy/therapy-widget/blocks/additional-therapy-detail'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/individual/blocks/session-participants'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/individual/blocks/time-spent'
import { useTherapyPsychoAnalysisOptions } from '../hook'
import { PsychoAnalysisBlock } from './psychoanalysis-block'
import { TherapyDetail } from './therapy-details'

interface TherapyPsychoAnalysisBlockProps {
  otherData?: QuickNoteSectionItem[]
  appointment?: Appointment
}
const TherapyPsychoAnalysisBlock = ({
  otherData,
  appointment,
}: TherapyPsychoAnalysisBlockProps) => {
  const { watch, setValue } = useFormContext()
  const therapyPsychoanalysis = watch('therapyPsychoanalysis')
  const options = useTherapyPsychoAnalysisOptions({ appointment })

  return (
    <Flex
      direction="column"
      py="2"
      px="2"
      className="rounded-3 border border-gray-7"
      gap="2"
    >
      <Flex align="center" gap="2">
        <CheckboxInput
          field="therapy"
          checked={watch('therapy')}
          disabled={watch('therapyDisabled')}
          onCheckedChange={(check) => {
            setValue('therapy', check)
            !check && setValue('therapyTimeSpent', '')
          }}
        />
        <Text className="cursor-default" weight="medium">
          Therapy/Psychoanalysis
        </Text>
      </Flex>
      {watch('therapy') && (
        <>
          <RadioSelectSection
            field="therapyPsychoanalysis"
            options={options}
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
              <AdditionalTherapyDetailBlock otherData={otherData} required />
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
