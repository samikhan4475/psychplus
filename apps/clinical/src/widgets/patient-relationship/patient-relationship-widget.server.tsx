import { unstable_noStore as noStore } from 'next/cache'
import { type PatientParams } from '@psychplus/patient'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { Preloader } from './preloader'
import { PatientRelationshipsWidgetClient } from './patient-relationship-widget.client'
import { getPatientRelationships } from './api.server'
import { getRelationshipCodeSets } from '@psychplus/codeset/api.server'

type PatientRelationshipWidgetProps = PatientParams

const PatientRelationshipWidgetServer = async ({
  patientId,
}: PatientRelationshipWidgetProps) => {
  noStore()
  const [
    user,
    patientRelationships,
    relationshipsCodeset,
  ] = await Promise.all([
    getUser(),
    getPatientRelationships({patientId}),
    getRelationshipCodeSets(),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <Preloader         
        store={useStore}
        user={user}
        patientRelationships={patientRelationships}
        relationshipsCodeset={relationshipsCodeset}
      />
      <PatientRelationshipsWidgetClient patientId={patientId} />
    </>
  )
}

export { PatientRelationshipWidgetServer, type PatientRelationshipWidgetProps }
