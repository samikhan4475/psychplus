import { Flex, Text } from '@radix-ui/themes'
import { RadioSelectSection, TextInput } from '@/components'
import { PatientProfile } from '@/types'
import { AlcoholBlock } from './alcohol-block'
import { BriefInterventionBlock } from './brief-invention-block'
import { DrugsBlock } from './drugs-block'
import { QuestionnairesBlock } from './questionnaires-block'
import { ReferralTreatmentBlock } from './referral-treatement-block'

interface AlcoholDrugsBlockProps {
  patientInfo: PatientProfile
}

const AlcoholDrugsBlock = ({ patientInfo }: AlcoholDrugsBlockProps) => {
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

      <AlcoholBlock patientInfo={patientInfo} />
      <DrugsBlock />

      <QuestionnairesBlock />
      <BriefInterventionBlock />
      <ReferralTreatmentBlock />
      <RadioSelectSection
        label="Discussed alcohol/substance use cessation for"
        field="alcoholSubstanceCessationDiscussionDuration"
        options={[
          { label: '≥ 15 mins', value: '>=15m' },
          { label: '≥ 31 mins', value: '>=31m' },
        ]}
      />
      <TextInput label="Other" field="otherAlcoholDrugs" />
    </Flex>
  )
}

export { AlcoholDrugsBlock }
