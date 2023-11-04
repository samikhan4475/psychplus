'use client'

import { useStore } from './store'

const UserWidgetClient = () => {
  const user = useStore().getUser()

  return (
    <div className="h-full w-full p-4">
      <div>
        This example widget will fetch and display the current user&apos;s name.
      </div>
      <div>
        <b>User:</b> {user.fullName}
      </div>
    </div>
  )
}

export { UserWidgetClient }
