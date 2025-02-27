'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { getQuestionnairesHistories } from '@/ui/procedures/tms-tab/client-actions'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { questionaireSections } from '@/ui/procedures/tms-tab/utils'
import { ScoreInterpretSection } from './score-interpret-section'

interface Props<T> {
  data: T
  patientId: string
}

const TreatmentObservationSection = ({
  data,
  patientId,
}: Props<TmsWidgetSchemaType>) => {
  const [questionnairesHistories, setQuestionnairesHistories] = useState<
    QuickNoteHistory[]
  >([])
  useEffect(() => {
    getQuestionnairesHistories({ patientId }).then((response) => {
      if (response.state === 'error') {
        return
      }
      setQuestionnairesHistories(response?.data ?? [])
    })
  }, [patientId])

  return (
    <Flex direction={'column'}>
      <Text className="mt-2 text-2 font-medium">
        Treatment Observation & Patient Response:
      </Text>
      <Text className="text-1 font-medium">{data.treatmentAndObservation}</Text>

      {questionaireSections.map(({ title, sectionName }) => {
        const sectionData = questionnairesHistories?.find(
          (item) => item.sectionName === sectionName,
        )

        return (
          <ScoreInterpretSection
            key={sectionName}
            title={title}
            questionaireData={sectionData}
          />
        )
      })}
    </Flex>
  )
}

export { TreatmentObservationSection }
