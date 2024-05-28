import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import {
  fetchPreferredPartnerPatient,
  fetchPreferredPartnerUserWorklist,
} from '@psychplus/preferred-partners/api.server'
import { PreferredUsersWidgetClient } from './preferred-users-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const PreferredUserWidgetServer = async ({
  preferredPartnerId,
}: {
  preferredPartnerId: string
}) => {
  noStore()

  const [preferredPartnerPatient, preferredPartnerWorklist, codesets] =
    await Promise.all([
      fetchPreferredPartnerPatient('5c40914d-2787-47c3-97e7-00386fbfcac5'),
      fetchPreferredPartnerUserWorklist('5c40914d-2787-47c3-97e7-00386fbfcac5'),
      getCodeSets(),
    ])

  return (
    <>
      <Preloader
        store={useStore}
        preferredPartnerPatient={preferredPartnerPatient}
        preferredPartnerWorklist={preferredPartnerWorklist}
        preferredPartnerId={preferredPartnerId}
        codeSets={codesets}
      />
      <PreferredUsersWidgetClient />
    </>
  )
}

export { PreferredUserWidgetServer }
