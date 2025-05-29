import { Prescription, TransmitResult } from '../types'

enum Step {
  Form = 'Form',
  Review = 'Review',
  CredentialVerification = 'CredentialVerification',
  OrderConfirm = 'OrderConfirm',
  Complete = 'Complete',
}

enum ConfirmationMethod {
  Otp = 'Otp',
  Authenticator = 'Authenticator',
}
interface StepComponentProps {
  onNext: () => void
  onPrev: () => void
  onJump: (step: Step) => void
  onClose?: () => void
  step: Step
  prescriptions?: Prescription[]
  onTransmit?: (isVerificationStep?: boolean) => Promise<void | string>
  isTransmiting?: boolean
  transmissionResult?: TransmitResult[]
}

export { ConfirmationMethod, Step, type StepComponentProps }
