import { unstable_noStore as noStore } from 'next/cache'
import { PatientPreloader, type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { getPatientInformation } from './api.server'
import { PatientInformationWidgetClient } from './patient-information-widget.client'
import { PatientInformationPreloader, useStore } from './store'

type PatientInformationWidgetProps = PatientParams

const PatientInformationWidgetServer = async ({
  patientId,
}: PatientInformationWidgetProps) => {
  noStore()

  const [user, patient, patientProfile] = await Promise.all([
    getUser(),
    getPatient({ patientId }),
    getPatientInformation({ patientId }),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <PatientPreloader patient={patient} store={[useStore]} />
      <PatientInformationPreloader
        patientProfileInformation={patientProfile}
        store={[useStore]}
      />
      <PatientInformationWidgetClient />
    </>
  )
}

export { PatientInformationWidgetServer, type PatientInformationWidgetProps }
