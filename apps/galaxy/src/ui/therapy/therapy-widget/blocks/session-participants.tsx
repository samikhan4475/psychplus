'use client'

import { Flex } from '@radix-ui/themes'
import { RadioSelectSection, SelectableChipDetails} from '@/components'

const defaultOptions = [
  { label: 'Patients', value: 'Patients' },
  { label: 'Patient with Patient/Guardian', value: 'PatientwithPatient/Guardian ' },
  { label: 'Patient & Partner', value: 'Patient&Partner' },
  { label: 'Patient & Family', value: 'Patient&Family' },
  { label: 'Patient and Other', value: 'Patient&Other' },
]
const TherapySessionParticipantsBlock = () => {
  return (
    <Flex align="center" height="24" gap="4">
      <RadioSelectSection
        label="Session Participants"
        field="therapySessionParticipants"
        options={defaultOptions}
        required
      />
      <SelectableChipDetails 
       label='Other'
       field='patherOther'
       type='text'
       showIndicator={false}
      />
    </Flex>
  )
}

export { TherapySessionParticipantsBlock }
