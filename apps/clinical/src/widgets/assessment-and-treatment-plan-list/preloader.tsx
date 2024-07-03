'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import {
  AssessmentAndTreatment,
  PatientParams,
} from '@psychplus/assessment-and-treatment-plan/types'
import { AssessmentAndTreatmentPlanStoreType } from './store'

type BoundStoreType = UseBoundStore<
  StoreApi<AssessmentAndTreatmentPlanStoreType>
>

interface PreloaderProps {
  store: BoundStoreType
  assessmentAndTreatmentPlans: AssessmentAndTreatment[]
}

const Preloader = ({
  store,
  assessmentAndTreatmentPlans,
  patientId,
  noteId,
}: PreloaderProps & PatientParams) => {
  const loaded = useRef(false)

  const { setAssessmentAndTreatmentPlans, setNoteId, setPatientId } = store(
    (state) => ({
      setAssessmentAndTreatmentPlans: state.setAssessmentAndTreatmentPlans,
      setPatientId: state.setPatientId,
      setNoteId: state.setNoteId,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setAssessmentAndTreatmentPlans(assessmentAndTreatmentPlans)
    setPatientId(patientId)
    setNoteId(noteId)
  }

  return null
}

export { Preloader }
