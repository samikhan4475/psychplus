'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TherapyTableBlock } from '@/ui/therapy/therapy-widget/blocks/therapy-table-block'
import { TherapySessionParticipantsBlock } from '@/ui/therapy/therapy-widget/individual/blocks/session-participants'
import { TherapyTimeSpentBlock } from '@/ui/therapy/therapy-widget/individual/blocks/time-spent'
import { TherapyDetail } from './therapy-details'

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
      {isTherapyChecked && (
        <Flex direction="column" gap="2">
          <Text className="cursor-default" weight="medium">
            Therapy Details
          </Text>
          <TherapyTimeSpentBlock />
          <TherapySessionParticipantsBlock />
          <TherapyTableBlock />
          <TherapyDetail
            field="additionalTherapyDetail"
            label="Additional Therapy Details"
          />
        </Flex>
      )}
    </>
  )
}

export { TherapyBlock }
