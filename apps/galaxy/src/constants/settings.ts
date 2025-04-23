enum LevelCode {
  System = 'System',
  Tenant = 'Tenant',
  User = 'User',
}

enum CategoryCode {
  Resource = 'Resource',
  Application = 'Application',
  View = 'View',
  FilterDefault = 'FilterDefault',
}

enum CategoryValue {
  ProviderDefaults = 'ProviderDefaults',
  StaffPreference = 'StaffPreference',
}

enum SettingStatusCode {
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
  Archived = 'Archived',
}

const NULL_CONTENT = 'null'

export {
  LevelCode,
  CategoryCode,
  CategoryValue,
  SettingStatusCode,
  NULL_CONTENT,
}
