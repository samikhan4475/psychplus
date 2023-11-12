'use client'

import { useRef } from 'react'
import { type UserStoreType } from './store'
import { type User } from './types'

const UserPreloader = ({
  user,
  store,
}: {
  user: User
  store: UserStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setUser))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(user))
  }

  return null
}

export { UserPreloader }
