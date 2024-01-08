import { LoginForm } from '@psychplus/auth/login'

interface ExistingPatientProps {
  onlogin?: () => void
}

const ExistingPatient = ({ onlogin }: ExistingPatientProps) => {
  return <LoginForm />
}

export { ExistingPatient }
