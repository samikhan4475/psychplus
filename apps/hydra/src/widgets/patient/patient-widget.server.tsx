import type { PatientParams, TokenParams } from '@psychplus/types'
import { PatientPreloader } from '@psychplus/store/patient'
import * as api from '@psychplus/api/server'
import { PatientWidgetClient } from './patient-widget.client'
import { useStore } from './store'

type PatientWidgetProps = TokenParams & PatientParams

const PatientWidgetServer = async ({
  token,
  patientId,
}: PatientWidgetProps) => {
  const patient = await api.getPatient({ token, patientId })

  return (
    <>
      <PatientPreloader patient={patient} store={[useStore]} />
      <PatientWidgetClient />
    </>
  )
}

export { PatientWidgetServer, type PatientWidgetProps }
