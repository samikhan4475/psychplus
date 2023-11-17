import { unstable_noStore as noStore } from 'next/cache'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { useStore } from './store'
import { UserWidgetClient } from './user-widget.client'

const UserWidgetServer = async () => {
  noStore()

  const user = await getUser()

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <UserWidgetClient />
    </>
  )
}

export { UserWidgetServer }
