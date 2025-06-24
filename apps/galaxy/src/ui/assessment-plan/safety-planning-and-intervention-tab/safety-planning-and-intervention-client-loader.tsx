'use client'

import { useEffect, useMemo, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { AlertDialog } from '../alert-dialog'
import { SafetyPlanningAndInterventionTab } from './safety-planning-and-intervention-tab'

interface PsychiatryAssessmentPlanWidgetProps {
  patientId: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const SafetyPlanningAndInterventionClientLoader = ({
  patientId,
  appointment,
  data,
}: PsychiatryAssessmentPlanWidgetProps) => {
  const [patientRelationships, setPatientRelationships] = useState<
    Relationship[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const { safetyPlanningInterventionData } = useStore(
    (state) => ({
      safetyPlanningInterventionData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention
        ] ?? data,
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
  }, [])

  if (error) return <Text>{error}</Text>

  return (
    <>
      <SafetyPlanningAndInterventionTab
        patientId={patientId}
        appointment={appointment}
        safetyPlanningInterventionData={safetyPlanningInterventionData ?? []}
        patientRelationships={patientRelationships}
      />
      <AlertDialog />
    </>
  )
}

export { SafetyPlanningAndInterventionClientLoader }
