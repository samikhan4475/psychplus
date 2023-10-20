'use client'

import { useSearchParams } from 'next/navigation'
import * as api from '@psychplus/api/client'
import { Button } from '@psychplus/ui/button'

const LoginPage = () => {
  const searchParams = useSearchParams()

  const login = async () => {
    api.login({ username: 'test', password: 'test' }).then(() => {
      const next = searchParams.get('next') ?? '/'
      location.assign(next)
    })
  }

  return (
    <>
      <Button
        onClick={() => {
          void login()
        }}
      >
        Login
      </Button>
    </>
  )
}

export { LoginPage }
