'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionItem, Relationship } from '@/types'
import { getSectionsData } from '@/ui/assessment-plan'
import { transformIn } from '@/ui/assessment-plan/safety-planning-and-intervention-tab/data'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { getWidgetContainerCheckboxStateByWidgetId } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SafetyPlanningAndInterventionNoteDetailView = ({
  data,
  appointment,
  visitType,
  visitSequence,
}: NoteDetailProps) => {
  const params = useParams()
  const patientId = params?.id as string

  const [patientRelationships, setPatientRelationships] = useState<
    Relationship[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [sectionsData, setSectionsData] = useState<QuickNoteSectionItem[]>([])

  useEffect(() => {
    if (!patientId) return

    const fetchRelationships = async () => {
      const [response, sectionsDataResponse] = await Promise.all([
        getPatientRelationshipsAction(patientId),
        getQuickNoteDetailAction(
          patientId,
          [
            QuickNoteSectionName.QuicknoteSectionMse,
            QuickNoteSectionName.QuicknoteSectionHPI,
          ],
          false,
          undefined,
          true,
        ),
      ])

      if (response.state === 'error') {
        setError(response.error)
      } else {
        setPatientRelationships(response.data)
      }

      if (sectionsDataResponse.state === 'error') {
        setError(
          sectionsDataResponse.error ??
            'Something went wrong. Please try again.',
        )
      } else {
        setSectionsData(sectionsDataResponse.data ?? [])
      }
    }

    fetchRelationships()
  }, [patientId])

  if (data?.length === 0) return null
  if (!appointment) return null

  if (error) return <Text>{error}</Text>

  const mseData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionMse,
  )
  const hpiData = getSectionsData(
    sectionsData,
    QuickNoteSectionName.QuicknoteSectionHPI,
  )

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

  return (
    <Details
      data={transformedData}
      patientRelationships={patientRelationships}
      actualNoteViewVisibility={actualNoteViewVisibility}
    />
  )
}

export { SafetyPlanningAndInterventionNoteDetailView }
