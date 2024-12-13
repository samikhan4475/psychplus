import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/blocks/session-participants'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/blocks/time-spent'
import { TherapyDetail } from './therapy-details'

const DEFAULT_THERAPY_DETAIL =
  'Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences. Provider engaged in schema exploration with patient to gain insight regarding patient’s irrational thoughts and maladaptive behavior patterns. Provider encouraged patient to self-reflect to make connections between dysfunctional beliefs, behaviors, and assumptions that may have affected their perception. Continued exploration of irrational thoughts and behaviors is recommended to map all types and directions of transference.'

interface TherapyBlockProps {
  isChecked?: boolean
}

const TherapyBlock: React.FC = ({ isChecked }: TherapyBlockProps) => {
  const { watch, setValue } = useFormContext()

  useEffect(() => {
    if (isChecked) {
      setValue('therapy', isChecked)
    }
  }, [isChecked, setValue])
  const isTherapyChecked = watch('therapy')

  return (
    <>
      <Flex align="center" gap="2">
        <CheckboxInput field="therapy" checked={isTherapyChecked} />
        <Text className="cursor-default" weight="medium">
          Therapy Block
        </Text>
      </Flex>
      {isTherapyChecked && (
        <div>
          <Text className="cursor-default" weight="medium">
            Therapy Details
          </Text>
          <TherapyTimeSpentBlock />
          <TherapySessionParticipantsBlock />
          <TherapyTableBlock />
          <TherapyDetail
            field="additionalTherapyDetail"
            label="Additional Therapy Details"
            defaultValue={DEFAULT_THERAPY_DETAIL}
          />
        </div>
      )}
    </>
  )
}

export { TherapyBlock }
