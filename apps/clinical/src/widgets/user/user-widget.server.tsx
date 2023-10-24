import type { TokenParams } from '@psychplus/types'
import { UserPreloader } from '@psychplus/store/user'
import * as api from '@psychplus/api/server'
import { useStore } from './store'
import { UserWidgetClient } from './user-widget.client'

type UserWidgetProps = TokenParams

const UserWidgetServer = async ({ token }: UserWidgetProps) => {
  const user = await api.getUser({ token })

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <UserWidgetClient />
    </>
  )
}

export { UserWidgetServer, type UserWidgetProps }
