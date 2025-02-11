'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection } from '@/components'
import { AlcoholBlock } from './alcohol-block'
import { AlcoholOtherBlock } from './alcohol-other-block'
import { BriefInterventionDetail } from './brief-intervention-block'
import { DrugsBlock } from './drugs-block'
import { QuestionnairesBlock } from './questionnaires-block'
import { ReferralTreatmentBlock } from './referral-treatement-block'

const AlcoholDrugsBlock = () => {
  const { watch, setValue } = useFormContext()
  const drugs = watch('drugs')
  const alcohol = watch('alcohol')
  const duration = watch('alcoholSubstanceCessationDiscussionDuration')

  useEffect(() => {
    if ((drugs === 'yes' || alcohol === 'yes') && !duration) {
      setValue('alcoholSubstanceCessationDiscussionDuration', '≥ 15 mins')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drugs, alcohol, duration])

  return (
    <Flex
      direction="column"
      gap="2"
      p="2"
      className="rounded-3 border border-gray-7"
    >
      <Text size="2" weight="medium">
        Screening for drug/alcohol use:
      </Text>

      <AlcoholBlock />
      <DrugsBlock />

      <QuestionnairesBlock />
      <BriefInterventionDetail
        label="Brief Intervention"
        defaultValue="Discussed with patient reasons for use of substance, health risk associated with use, how ready and confident the patient is about quitting, gave advice and discussed the following goal"
      />
      <ReferralTreatmentBlock />
      <RadioSelectSection
        label="Discussed alcohol/substance use cessation for"
        field="alcoholSubstanceCessationDiscussionDuration"
        options={[
          { label: '≥ 15 mins', value: '≥ 15 mins' },
          { label: '≥ 31 mins', value: '≥ 31 mins' },
        ]}
      />
      <AlcoholOtherBlock />
    </Flex>
  )
}

export { AlcoholDrugsBlock }
