'use client'

import { LoginPage as BaseLoginPage } from '@psychplus/auth/login'

const LoginPage = () => (
  <BaseLoginPage showSignupLink={false} basePath="/galaxy" />
)

export default LoginPage
