import { UserSetting } from '@/types'

type Visit = UserSetting & ServiceVisit

interface ServiceVisit {
  id: string
  label: string
  checked: boolean
  serviceOrder?: number
  visitOrder?: number
  parsedChecked?: boolean
  subRows?: Visit[]
}

export type { ServiceVisit, Visit }
