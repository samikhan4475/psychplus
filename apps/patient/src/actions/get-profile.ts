'use server'

import { getProfile } from '@/api'

const getProfileAction = () => getProfile()

export { getProfileAction }
