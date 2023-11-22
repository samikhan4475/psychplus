interface LoginResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: string
  refreshTokenExpiry: string
  userId: string
}

export type { LoginResponse }
