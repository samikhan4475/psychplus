import { cookies } from 'next/headers'
import { AUTH_TOKEN_COOKIE_NAME } from '../constants'

const getAuthToken = () => cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value

export { getAuthToken }
