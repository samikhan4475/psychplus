import { type UserStoreType } from './store'

const useUser = (store: UserStoreType) => {
  const user = store((state) => state.user)

  if (!user) {
    throw new Error()
  }
  return user
}

export { useUser }
