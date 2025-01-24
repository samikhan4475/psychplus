import { CredentialingTabs } from './credentialing-tabs'

const CredentialingView = ({ staffId }: { staffId: string }) => {
  return <CredentialingTabs staffId={staffId} />
}

export { CredentialingView }
