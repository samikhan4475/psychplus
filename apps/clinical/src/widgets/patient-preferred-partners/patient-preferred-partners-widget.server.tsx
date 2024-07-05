import { unstable_noStore as noStore } from 'next/cache'
import { type PatientParams } from '@psychplus/patient'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { Preloader } from './preloader'
import { PreferredPartnersWidgetClient } from './patient-preferred-partners-widget.client'
import { getPatientPreferredPartners } from './api.server'

type PatientPreferredPartnersWidgetProps = PatientParams

const PreferredPartnersWidgetServer = async ({
  patientId,
}: PatientPreferredPartnersWidgetProps) => {
  noStore()
  const [
    user,
    patientPreferredPartners,
  ] = await Promise.all([
    getUser(),
    getPatientPreferredPartners({ patientId }),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <Preloader         
        store={useStore}
        user={user}
        patientPreferredPartners={patientPreferredPartners}
      />
      <PreferredPartnersWidgetClient />
    </>
  )
}

export { PreferredPartnersWidgetServer, type PatientPreferredPartnersWidgetProps }
