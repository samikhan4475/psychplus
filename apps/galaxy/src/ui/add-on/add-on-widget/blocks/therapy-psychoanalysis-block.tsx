import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection } from '@/components'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/blocks/session-participants'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/blocks/time-spent'
import { PsychoAnalysisBlock } from './psychoanalysis-block'
import { TherapyDetail } from './therapy-details'

const TherapyPsychoAnalysisBlock = () => {
  const form = useFormContext()
  const THERAPY_PSYCHOANALYSIS_OPTIONS = [
    { label: 'Therapy', value: 'therapy' },
    { label: 'Psychoanalysis', value: 'psychoanalysis' },
    { label: 'Neither', value: 'neither' },
  ]
  return (
    <Flex
      direction="column"
      py="2"
      px="2"
      className="rounded-3 border border-gray-7"
      gap="2"
    >
      <RadioSelectSection
        field="therapyPsychoanalysis"
        options={THERAPY_PSYCHOANALYSIS_OPTIONS}
      />
      {form.watch('therapyPsychoanalysis') === 'therapy' && (
        <>
          <Text className="cursor-default" weight="medium">
            Therapy Details
          </Text>
          <TherapyTimeSpentBlock />
          <TherapySessionParticipantsBlock />
          <TherapyTableBlock />
          <TherapyDetail
            field="additionalTherapyDetail"
            label="Additional Therapy Details"
            defaultValue="Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences.  Provider engaged in schema exploration with patient to gain insight regarding patient’s irrational thoughts and maladaptive behavior patterns. Provider encouraged patient to self-reflect to make connections between dysfunctional beliefs, behaviors, and assumptions that may have affected their perception. Continued exploration of irrational thoughts and behaviors is recommended to map all types and directions of transference."
          />
        </>
      )}
      {form.watch('therapyPsychoanalysis') === 'psychoanalysis' && (
        <>
          <PsychoAnalysisBlock />
          <TherapyDetail
            field="additionalPsychoAnalysisDetail"
            label="Additional Therapy Details"
            defaultValue="The patient displayed transference that may be the result of unconscious conflicts. The provider encouraged the patient to reflect on past experiences that could be impacting the patient’s life. The provider further explored repressed thoughts with the patient to help the patient become aware of the root causes of their psychological distress. Continued support and discussion of the transference are recommended for continued growth."
          />
        </>
      )}
    </Flex>
  )
}

export { TherapyPsychoAnalysisBlock }
