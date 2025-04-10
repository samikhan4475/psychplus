import { CredentialingTabs } from './credentialing-tabs'

const CredentialingView = ({
  isProfileView,
  staffId,
}: {
  isProfileView?: boolean
  staffId?: string
}) => {
  return <CredentialingTabs isProfileView={isProfileView} staffId={staffId} />
}

export { CredentialingView }
