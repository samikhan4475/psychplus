import { FeatureCard } from '@/components-v2'
import { ChangePasswordForm } from './change-password-form'

const LoginCard = () => {
  return (
    <FeatureCard title="Login" contentClassName="gap-3">
      <ChangePasswordForm />
    </FeatureCard>
  )
}

export { LoginCard }
