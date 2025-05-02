'use server'

import { getConsents } from '@/api'

const getConsentsAction = () => getConsents()

export { getConsentsAction }
