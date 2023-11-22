import { unstable_noStore as noStore } from 'next/cache'
import { ProfessionalClaimWidgetClient } from './professional-claim-widget.client'
import { CodeSetPreloader, getCodeSets } from '@psychplus/codeset'
import { getUser, UserPreloader } from '@psychplus/user'
import { useStore } from './store'

const ProfessionalClaimWidgetServer = async () => {
  const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

const ProfessionalClaimWidgetServer = () => {
  noStore()

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} />
      <ProfessionalClaimWidgetClient />
    </>
  )
}

export { ProfessionalClaimWidgetServer }
