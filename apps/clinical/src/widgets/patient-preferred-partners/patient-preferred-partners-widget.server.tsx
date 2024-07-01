import { unstable_noStore as noStore } from 'next/cache'
import { type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { Preloader } from './preloader'
import { PreferredPartnersWidgetClient } from './patient-preferred-partners-widget.client'

type PatientPreferredPartnersWidgetProps = PatientParams

const PreferredPartnersWidgetServer = async ({
  patientId,
}: PatientPreferredPartnersWidgetProps) => {
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
      <PreferredPartnersWidgetClient />
    </>
  )
}

export { PreferredPartnersWidgetServer, type PatientPreferredPartnersWidgetProps }
