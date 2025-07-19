import { ConfigurationResponse } from '@psychplus-v2/types'
import { FeatureCard } from '@/components-v2'
import { ChangePasswordForm } from './change-password-form'

const LoginCard = ({
  configuration,
}: {
  configuration: ConfigurationResponse
}) => {
  return (
    <FeatureCard title="Login" contentClassName="gap-3">
      <ChangePasswordForm configuration={configuration} />
    </FeatureCard>
  )
}

export { LoginCard }
