'use client'

import { getUser } from '@psychplus/store/user'
import { useStore } from './store'

const UserWidgetClient = () => {
  const user = getUser(useStore)

  return (
    <div className="h-full w-full p-4">
      <div className="text-xl">
        This example widget will fetch and display the current user&apos;s name.
      </div>
      <div>
        <b>User:</b> {user.fullName}
      </div>
    </div>
  )
}

export { UserWidgetClient }
