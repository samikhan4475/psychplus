import { Metadata } from '.'

interface User {
  id: string
  metadata: Metadata
  recordStatus: string
  environmentId: string
  username: string
  isEnabled: boolean
}

interface Environment {
  id: string
  metadata: Metadata
  recordStatus: string
  featureFlagId: string
  environmentCode: string
  isEnabledDefault: boolean
  users: User[]
}

interface FeatureFlagProps {
  recordStatuses: string[]
  exactShortName?: string
  environmentCodes: string[]
}

interface FeatureFlagData {
  enabled: boolean
  expiry: number
}
enum RecordStatus {
  ACTIVE = 'Active',
}

interface FeatureFlag {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  description: string
  environments: Environment[]
}

export type { FeatureFlag, FeatureFlagProps, FeatureFlagData, RecordStatus }
