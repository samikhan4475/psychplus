import { unstable_noStore as noStore } from 'next/cache'
import { getPatients } from '@psychplus/patient/api.server'
import { getPreferredPartners } from '@psychplus/preferred-partners/api.server'
import { Preloader } from './preloader'
import { ReconcileUserListDialogWidgetClient } from './reconcile-user-list-dialog-widget.client'
import { useStore } from './store'

const ReconcileUserListDialogWidgetServer = async ({
  searchParam,
}: {
  searchParam: {
    id: string
    firstName: string
    lastName: string
    birthDate: string
  }
}) => {
  noStore()

  const [patients, preferredPartner] = await Promise.all([
    getPatients({
      firstNameContains: searchParam.firstName,
      lastNameContains: searchParam.lastName,
      dateOfBirth: searchParam.birthDate,
    }),
    getPreferredPartners({
      partnerIds: [searchParam.id]
    }),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        preferredPartnerId={searchParam.id}
        preferredPartner={[preferredPartner]}
        patients={patients}
      />
      <ReconcileUserListDialogWidgetClient />
    </>
  )
}
export { ReconcileUserListDialogWidgetServer }
