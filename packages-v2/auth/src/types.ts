interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
}

interface UserResponse {
  legalName: {
    firstName: string
    lastName: string
  }
  contactInfo: {
    email: string
  }
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
}

interface RefreshRequest {
  userId: string
  refreshToken: string
}

export type {
  User,
  UserResponse,
  AuthRequest,
  AuthResponse,
  AuthSession,
  RefreshRequest,
}
