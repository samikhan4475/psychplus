import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getPatient } from '@psychplus/patient/api.server'
import { getUser } from '@psychplus/user/api.server'
import { Preloader } from './preloader'
import { useStore } from './store'
import { AddRelationshipWidgetClient } from './add-relationship-widget.client'

interface AddRelationshipWidgetServerProps {
  patientId: number
}

const AddRelationshipWidgetServer = async ({
  patientId,
}: AddRelationshipWidgetServerProps) => {
  noStore()

  const [codeSets, user, patient] = await Promise.all([
    getCodeSets(),
    getUser(),
    getPatient({ patientId }),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        user={user}
        patient={patient}
        codeSets={codeSets}
      />
      <AddRelationshipWidgetClient />
    </>
  )
}

export { AddRelationshipWidgetServer }
