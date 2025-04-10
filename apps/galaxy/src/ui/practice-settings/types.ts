import { Metadata } from '@/types'

enum PracticeSettingsTab {
  SCHEDULING = 'Scheduling',
  CREDENTIALING = 'Credentialing',
  USERS = 'Users',
}

interface ManagerName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface CredentialingManager {
  id: string
  practiceId: string
  managerStaffId: number
  status: string
  isAlertCheck: boolean
  metadata: Metadata
  managerName: Partial<ManagerName>
}

export { PracticeSettingsTab, type CredentialingManager }
