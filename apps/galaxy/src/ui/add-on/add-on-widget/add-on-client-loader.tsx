'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { shouldDisableDiagnosisActions } from '@/ui/diagnosis/diagnosis/utils'
import { useStore as useQuestionnaireStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { filterAndSort } from '@/utils'
import { AddOnWidget } from './add-on-widget'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import { getBookedAppointmentAction } from './client-actions'
import { transformIn } from './data'

interface AddOnClientLoaderProps {
  patientId: string
  appointment?: Appointment
  visitType: string
  data?: QuickNoteSectionItem[]
}

const AddOnClientLoader = ({
  patientId,
  appointment,
  visitType,
  data = [],
}: AddOnClientLoaderProps) => {
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([])
  const [values, setValues] = useState<AddOnWidgetSchemaType>({})
  const [otherData, setOtherData] = useState<QuickNoteSectionItem[]>([])
  const visitSequence = useSearchParams().get('visitSequence') ?? ''
  const isHospitalDisachargeVisit = shouldDisableDiagnosisActions(
    visitType,
    visitSequence,
  )
  const { workingDiagnosis, workingDischargeDiagnosis } = useStore(
    (state) => ({
      workingDischargeDiagnosis:
        state.actualNotewidgetsData[
          QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
        ],
      workingDiagnosis:
        state.actualNotewidgetsData[
          QuickNoteSectionName.QuickNoteSectionDiagnosis
        ],
    }),
    dequal,
  )
  const { MOCAQuestionnaire } = useQuestionnaireStore((state) => ({
    MOCAQuestionnaire:
      state.histories[QuickNoteSectionName.QuickNoteSectionMoca],
  }))

  const diagnosisData = useMemo(
    () =>
      isHospitalDisachargeVisit ? workingDischargeDiagnosis : workingDiagnosis,
    [isHospitalDisachargeVisit, workingDischargeDiagnosis, workingDiagnosis],
  )

  useEffect(() => {
    getBookedAppointmentAction(appointment).then((response) => {
      if (response.state !== 'error') {
        setAppointmentData(response.data)
      }
    })
  }, [appointment])
  useEffect(() => {
    const [addOndata, otherData] = filterAndSort(
      data,
      'additionalTherapyDetail',
    )
    setOtherData(otherData)
    const transformedValues = transformIn(
      addOndata,
      appointmentData,
      visitType,
      diagnosisData,
      MOCAQuestionnaire,
    )
    setValues(transformedValues)
  }, [data, visitType, appointmentData, diagnosisData, MOCAQuestionnaire])

  return (
    <AddOnWidget
      patientId={patientId}
      initialValue={values}
      appointment={appointment}
      otherData={otherData}
    />
  )
}

export { AddOnClientLoader }
