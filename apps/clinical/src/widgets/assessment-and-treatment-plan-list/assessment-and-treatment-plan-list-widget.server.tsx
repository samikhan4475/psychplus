import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { getAssessmentPlanOfTreatments } from '@psychplus/assessment-and-treatment-plan/api.server'
import { PatientParams } from '@psychplus/assessment-and-treatment-plan/types'
import { AssessmentAndTreatmnetPlansListWidgetClient } from './assessment-and-treatment-plan-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

type AssessmentAndTreatmnetPlansListWidgetServerProps = PatientParams

const AssessmentAndTreatmnetPlansListWidgetServer = async ({
  patientId,
  noteId,
}: AssessmentAndTreatmnetPlansListWidgetServerProps) => {
  noStore()

  const assessmentAndTreatmentPlans = await getAssessmentPlanOfTreatments(
    patientId,
    noteId,
  )

  return (
    <>
      <Preloader
        store={useStore}
        assessmentAndTreatmentPlans={assessmentAndTreatmentPlans}
        patientId={patientId}
        noteId={noteId}
      />
      <AssessmentAndTreatmnetPlansListWidgetClient />
    </>
  )
}
export { AssessmentAndTreatmnetPlansListWidgetServer }
