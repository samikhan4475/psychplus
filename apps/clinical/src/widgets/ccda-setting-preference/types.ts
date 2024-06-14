export interface MetaData {
  createdOn: string
  createdBy: number
  createdByFullName: string
}

export interface UserSetting {
  id?: string
  metadata?: MetaData
  settingStatusCode: string
  levelCode: string
  userId?: number
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}
