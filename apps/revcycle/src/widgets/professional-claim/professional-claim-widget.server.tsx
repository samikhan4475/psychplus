import { unstable_noStore as noStore } from 'next/cache'
import { CodeSetPreloader } from '@psychplus/codeset'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { ProfessionalClaimWidgetClient } from './professional-claim-widget.client'
import { useStore } from './store'

const ProfessionalClaimWidgetServer = async () => {
  noStore()

  const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} />
      <ProfessionalClaimWidgetClient />
    </>
  )
}

export { ProfessionalClaimWidgetServer }
