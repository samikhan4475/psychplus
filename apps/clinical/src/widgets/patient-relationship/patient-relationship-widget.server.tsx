import { unstable_noStore as noStore } from 'next/cache'
import { type PatientParams } from '@psychplus/patient'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { Preloader } from './preloader'
import { PatientRelationshipsWidgetClient } from './patient-relationship-widget.client'

type PatientRelationshipWidgetProps = PatientParams

const PatientRelationshipWidgetServer = async ({
  patientId,
}: PatientRelationshipWidgetProps) => {
  noStore()
  const user = await getUser()

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <Preloader         
        store={useStore}
        user={user}
      />
      <PatientRelationshipsWidgetClient />
    </>
  )
}

export { PatientRelationshipWidgetServer, type PatientRelationshipWidgetProps }
