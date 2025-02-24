import { Metadata } from './metadata'

interface UserSetting {
  id: string
  metadata?: Metadata
  settingStatusCode: string
  levelCode: 'System' | 'Tenant' | 'User'
  userId: number
  categoryCode: 'Resource' | 'Application' | 'View' | 'FilterDefault'
  categoryValue: string
  name: string
  content: string
}

type AddSelfUserSettingBody = Omit<UserSetting, 'id' | 'metadata' | 'userId'>

export type { UserSetting, AddSelfUserSettingBody }
