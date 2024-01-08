import { type StaffStoreType, type UserStoreType } from './store'

const useUser = (store: UserStoreType) => {
  const user = store((state) => state.user)

  if (!user) {
    throw new Error()
  }
  return user
}

const useStaff = (store: StaffStoreType) => {
  const staff = store((state) => state.staff)

  if (!staff) {
    throw new Error()
  }
  return staff
}

export { useUser, useStaff }
