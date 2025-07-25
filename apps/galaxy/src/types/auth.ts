import { Role } from './authorization'
import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'

interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  honors?: string
  staffId: string
}

interface UserResponse {
  id: number
  metadata?: Metadata
  username: string
  legalName: LegalName
  userRoleCode: string
  contactInfo: ContactDetails
  staffId: number
  patientId?: number
  userRoles?: Role[]
}

interface UserType {
  userType: string
  resourceId: number
}

interface AuthRequest {
  username: string
  password: string
}

interface AuthResponse {
  userId: string
  accessToken: string
  refreshToken: string
  accessTokenExpiry: string
  refreshTokenExpiry: string
}

interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
  accessTokenExpiry: string
  practiceId?: string
  sessionId?: string
}

interface UserType {
  userType: string
  resourceId: number
}

interface RefreshRequest {
  userId: string
  refreshToken: string
}

interface AuthSessionIds {
  sessionId?: string
  sessionPracticeId?: string
}

export type {
  User,
  UserResponse,
  AuthRequest,
  AuthResponse,
  AuthSession,
  RefreshRequest,
  UserType,
  AuthSessionIds,
}
