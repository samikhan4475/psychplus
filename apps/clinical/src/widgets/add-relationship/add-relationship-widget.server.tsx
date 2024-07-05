import { unstable_noStore as noStore } from 'next/cache'
import { getRelationshipCodeSets } from '@psychplus/codeset/api.server'
import { getPatient } from '@psychplus/patient/api.server'
import { getUser } from '@psychplus/user/api.server'
import { AddRelationshipWidgetClient } from './add-relationship-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

interface AddRelationshipWidgetServerProps {
  patientId: number
}

const AddRelationshipWidgetServer = async ({
  patientId,
}: AddRelationshipWidgetServerProps) => {
  noStore()

  const [user, patient, relationshipsCodeset] = await Promise.all([
    getUser(),
    getPatient({ patientId }),
    getRelationshipCodeSets(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        user={user}
        patient={patient}
        relationshipsCodeset={relationshipsCodeset}
      />
      <AddRelationshipWidgetClient />
    </>
  )
}

export { AddRelationshipWidgetServer }
