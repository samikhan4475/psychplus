'use client'

import { LoginPage as BaseLoginPage } from '@psychplus/auth/login'

const LoginPage = () => (
  <BaseLoginPage showSignupLink={false} basePath="/platform" />
)

export default LoginPage
