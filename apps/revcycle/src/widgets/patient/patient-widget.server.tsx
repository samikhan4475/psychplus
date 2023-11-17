import { unstable_noStore as noStore } from 'next/cache'
import { PatientPreloader, type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { PatientWidgetClient } from './patient-widget.client'
import { useStore } from './store'

type PatientWidgetProps = PatientParams

const PatientWidgetServer = async ({ patientId }: PatientWidgetProps) => {
  noStore()

  const patient = await getPatient({ patientId })

  return (
    <>
      <PatientPreloader patient={patient} store={[useStore]} />
      <PatientWidgetClient />
    </>
  )
}

export { PatientWidgetServer, type PatientWidgetProps }
