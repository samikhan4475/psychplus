import { CodeSetPreloader, getCodeSets } from '@psychplus/codeset'
import { getUser, UserPreloader } from '@psychplus/user'
import { ClaimStatusConfigWidgetClient } from './claim-status-config-widget.client'
import { useStore } from './store'

const ClaimStatusConfigWidgetServer = async () => {
  const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} />
      <ClaimStatusConfigWidgetClient />
    </>
  )
}

export { ClaimStatusConfigWidgetServer }
