interface UserFullName {
  firstName: string
  lastName: string
}

interface User {
  userId: number
  username: string
  userFullName: UserFullName
  userRoles: string[]
  isTestUser: boolean
  isUserHasProfileImage: boolean
  patientId: number
  inboxTotalCount: number
}

interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
  accessTokenExpiry: string
  practiceId?: string
  sessionId?: string
}

export { type AuthSession,type User }
