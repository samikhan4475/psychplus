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

interface SettingSearchFilters {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isHierarchicalQuery?: boolean
  settingStatusCode?: string
  levelCodes?: string[]
  userId?: 0
  categoryCodes?: string[]
  categoryValue?: string
  categoryValues?: string[]
  name?: string
  namePartial?: string
}

type AddSelfUserSettingBody = Omit<UserSetting, 'id' | 'metadata' | 'userId'>

type AddOthersSettingBody = Omit<UserSetting, 'id' | 'metadata'>

type UpdateOthersSettingBody = Omit<UserSetting, 'id' | 'metadata'>

export type {
  UserSetting,
  AddSelfUserSettingBody,
  AddOthersSettingBody,
  UpdateOthersSettingBody,
  SettingSearchFilters,
}
