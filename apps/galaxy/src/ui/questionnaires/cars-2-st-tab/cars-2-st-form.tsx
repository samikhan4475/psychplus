import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { parseDate, type DateValue } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { getPatientProfileAction } from '@/actions'
import { LoadingPlaceholder } from '@/components'
import { getAgeFromDate } from '@/utils'
import { QuestionnairesForm } from '../shared'
import {
  LABELS,
  QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
  SCORE_INTERPRETATION_RANGES_AGE_12,
} from './constants'

interface QuestionnairesFormGqAscProps {
  totalScore: number
  disabled?: boolean
}

const QuestionnairesFormCars2St = ({
  totalScore,
  disabled,
}: QuestionnairesFormGqAscProps) => {
  const [patientLoading, setPatientLoading] = useState(true)
  const [patientAge, setPatientAge] = useState<number | null>()
  const patientId = useParams().id as string
  useEffect(() => {
    ;(async () => {
      const response = await getPatientProfileAction(patientId)
      if (response.state === 'success' && response.data.birthdate) {
        const birthdate: DateValue = parseDate(response.data.birthdate)
        setPatientAge(getAgeFromDate(birthdate))
        setPatientAge(response.data.age)
      }
      setPatientLoading(false)
    })()
  }, [patientId])

  if (patientLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <Flex maxWidth="100%" className="bg-white w-full" px="3" py="1">
      <Flex direction="column" className="w-full">
        <QuestionnairesForm
          data={QUESTIONS}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={
            patientAge && patientAge <= 12
              ? SCORE_INTERPRETATION_RANGES_AGE_12
              : SCORE_INTERPRETATION_RANGES
          }
          disabled={disabled}
          showHeader
          classNameHeaderCell="bg-pp-focus-bg align-middle border-pp-table-border"
        />
      </Flex>
    </Flex>
  )
}

export { QuestionnairesFormCars2St }
