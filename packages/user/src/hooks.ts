import { type UserStoreType } from './store'

const useUser = (store: UserStoreType) => {
  const user = store().user

  if (!user) {
    throw new Error()
  }
  return user
}

export { useUser }
