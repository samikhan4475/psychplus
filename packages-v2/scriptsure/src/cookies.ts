import { cookies } from 'next/headers'
import { ROOT_DOMAIN, SCRIPTSURE_SESSION_COOKIE } from '@psychplus-v2/env'
import { decrypt, encrypt } from './crypto'
import type { Session } from './types'

const setCookie = (value: Session) => {
  const encrypted = encrypt(JSON.stringify(value))

  cookies().set(SCRIPTSURE_SESSION_COOKIE, encrypted, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    domain: ROOT_DOMAIN,
  })
}

const getCookie = () => {
  const encryptedCookie = cookies().get(SCRIPTSURE_SESSION_COOKIE)?.value

  if (!encryptedCookie) {
    return undefined
  }

  try {
    return JSON.parse(decrypt(encryptedCookie)) as Session
  } catch (e) {
    return undefined
  }
}

export { setCookie, getCookie }
