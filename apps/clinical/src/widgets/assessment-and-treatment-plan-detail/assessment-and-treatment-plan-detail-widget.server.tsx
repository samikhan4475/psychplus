import React from 'react'
import { Box } from '@radix-ui/themes'
import { getAssessmentPlanOfTreatments } from '@psychplus/assessment-and-treatment-plan/api.server'
import { AssessmentAndTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { Preloader } from '../assessment-and-treatment-plan-list/preloader'
import { useStore } from '../assessment-and-treatment-plan-list/store'
import { AssessmentAndTreatmnetPlansDetailWidgetClient } from './assessment-and-treatment-plan-detail-widget.client'

interface PatientParams {
  patientId: number
  noteId: number
  rowId: string
}

const AssessmentAndTreatmnetPlansDetailWidgetServer = async ({
  patientId,
  noteId,
  rowId,
}: PatientParams) => {
  let assessmentAndTreatmentPlans: AssessmentAndTreatment[] = []
  let errorMessage = null

  try {
    assessmentAndTreatmentPlans = await getAssessmentPlanOfTreatments(
      patientId,
      noteId,
    )
  } catch (error) {
    errorMessage =
      'Failed to load assessment and treatment plans. Please try again later.'
  }

  return (
    <ToastProvider>
      {errorMessage ? (
        <Box className="border-red-500 rounded-md text-red-500 border p-2.5">
          {errorMessage}
        </Box>
      ) : (
        <>
          <Preloader
            store={useStore}
            assessmentAndTreatmentPlans={assessmentAndTreatmentPlans}
            patientId={patientId}
            noteId={noteId}
          />
          <AssessmentAndTreatmnetPlansDetailWidgetClient rowId={rowId} />
        </>
      )}
    </ToastProvider>
  )
}

export { AssessmentAndTreatmnetPlansDetailWidgetServer }
