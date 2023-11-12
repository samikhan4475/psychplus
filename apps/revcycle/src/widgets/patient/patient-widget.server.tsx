import {
  getPatient,
  PatientPreloader,
  type PatientParams,
} from '@psychplus/patient'
import { PatientWidgetClient } from './patient-widget.client'
import { useStore } from './store'

type PatientWidgetProps = PatientParams

const PatientWidgetServer = async ({ patientId }: PatientWidgetProps) => {
  const patient = await getPatient({ patientId })

  return (
    <>
      <PatientPreloader patient={patient} store={[useStore]} />
      <PatientWidgetClient />
    </>
  )
}

export { PatientWidgetServer, type PatientWidgetProps }
