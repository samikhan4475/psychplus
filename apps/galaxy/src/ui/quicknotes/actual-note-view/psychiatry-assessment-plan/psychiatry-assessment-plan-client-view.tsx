'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { transformIn } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/data'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { QuickNoteSectionName } from '../../constants'
import { useStore } from '../../store'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  data?: QuickNoteSectionItem[]
  appointment?: Appointment
}

const PsychiatryAssessmentPlanClientView = ({
  data,
  appointment,
}: PastPsychHxDetailsProps) => {
  const params = useParams()
  const patientId = params?.id as string

  const [patientRelationships, setPatientRelationships] = useState<
    Relationship[]
  >([])
  const [error, setError] = useState<string | null>(null)

  const codesData = useStore(
    useShallow(
      (state) =>
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] || [],
    ),
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

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan
      }
    >
      <Details
        data={transformIn(data ?? [])}
        appointment={appointment as Appointment}
        patientRelationships={patientRelationships}
        codesData={codesData}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PsychiatryAssessmentPlanClientView }
