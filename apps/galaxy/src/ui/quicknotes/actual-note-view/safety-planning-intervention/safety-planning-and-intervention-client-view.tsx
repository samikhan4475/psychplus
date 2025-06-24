'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { transformIn } from '@/ui/assessment-plan/safety-planning-and-intervention-tab/data'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { useStore } from '../../store'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type SafetyPlanningInterventionProps = {
  data?: QuickNoteSectionItem[]
  appointment?: Appointment
  visitType: string
  visitSequence: string
}

const SafetyPlanningAndInterventionClientView = ({
  data,
  appointment,
  visitType,
  visitSequence,
}: SafetyPlanningInterventionProps) => {
  const params = useParams()
  const patientId = params?.id as string

  const [patientRelationships, setPatientRelationships] = useState<
    Relationship[]
  >([])
  const [error, setError] = useState<string | null>(null)

  const { hpiData, mseData } = useStore(
    (state) => ({
      hpiData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionHPI
        ] ?? [],
      mseData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionMse
        ] ?? [],
    }),
    dequal,
  )

  useEffect(() => {
    if (!patientId) return

    const fetchRelationships = async () => {
      const [response] = await Promise.all([
        getPatientRelationshipsAction(patientId),
      ])

      if (response.state === 'error') {
        setError(response.error)
      } else {
        setPatientRelationships(response.data)
      }
    }

    fetchRelationships()
  }, [patientId])

  const transformedData = transformIn(data ?? [])

  const actualNoteViewVisibility = getWidgetContainerCheckboxStateByWidgetId({
    widgetId: QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention,
    visitType,
    visitSequence,
    initialValue: transformedData.widgetContainerCheckboxField,
    mseData,
    hpiData,
    appointment,
  })?.actualNoteViewVisibility

  if (error) return <Text>{error}</Text>

  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention
      }
    >
      <Details
        data={transformedData}
        patientRelationships={patientRelationships}
        actualNoteViewVisibility={actualNoteViewVisibility}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SafetyPlanningAndInterventionClientView }
