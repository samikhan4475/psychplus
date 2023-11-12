import { getUser, UserPreloader } from '@psychplus/user'
import { useStore } from './store'
import { UserWidgetClient } from './user-widget.client'

const UserWidgetServer = async () => {
  const user = await getUser()

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <UserWidgetClient />
    </>
  )
}

export { UserWidgetServer }
