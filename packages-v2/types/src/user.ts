import { Metadata } from './metadata'

interface UserSettings {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  userId: number
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

export { type UserSettings }
