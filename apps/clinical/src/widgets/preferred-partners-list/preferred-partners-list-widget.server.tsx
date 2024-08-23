import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getPreferredPartners } from '@psychplus/preferred-partners/api.server'
import { QUERY_TOKEN } from '@psychplus/utils/constants'
import { getUrl } from '@psychplus/utils/server'
import { PreferredPartnersListWidgetClient } from './preferred-partners-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const PreferredPartnersListWidgetServer = async () => {
  noStore()

  const url = getUrl()
  const token = url.searchParams.get(QUERY_TOKEN)

  const [codeSets, preferredPartners] = await Promise.all([
    getCodeSets(),
    getPreferredPartners(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        codeSets={codeSets}
        preferredPartners={[preferredPartners]}
        token={token ?? ''}
      />
      <PreferredPartnersListWidgetClient />
    </>
  )
}

export { PreferredPartnersListWidgetServer }
