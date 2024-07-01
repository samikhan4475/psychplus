import { unstable_noStore as noStore } from 'next/cache'
import { type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { Preloader } from './preloader'
import { LinkAccountWidgetClient } from '.'

type PatientInformationWidgetProps = PatientParams

const LinkAccountWidgetServer = async ({
  patientId,
}: PatientInformationWidgetProps) => {
  noStore()
  const [
    user,
  ] = await Promise.all([
    getUser(),
    getPatient({ patientId }),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <Preloader         
        store={useStore}
        user={user}
      />
      <LinkAccountWidgetClient />
    </>
  )
}

export { LinkAccountWidgetServer, type PatientInformationWidgetProps }
