import { unstable_noStore as noStore } from 'next/cache'
import { getPreferredPartners } from '@psychplus/preferred-partners/api.server'
import { PreferredPartnerDetailsWidgetClient } from './preferred-partner-details-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'
import { Patient } from './types'

const PreferredPartnerDetailsWidgetServer = async ({ patientId }: Patient) => {
  noStore()

  const preferredPartner = await getPreferredPartners({
    partnerIds: [patientId],
  })

  return (
    <>
      <Preloader store={useStore} preferredPartner={[preferredPartner]} />
      <PreferredPartnerDetailsWidgetClient patientId={patientId} />
    </>
  )
}

export { PreferredPartnerDetailsWidgetServer }
