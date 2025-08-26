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
interface StepContext {
  transmissionResult?: TransmitResult[]
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
  isRefillTab?: boolean
  isRefillAndChangeRequest?: boolean
  onCloseModal?: (open: boolean) => void
  stepContext?: StepContext
  setStepContext?: React.Dispatch<React.SetStateAction<StepContext>>
  intialStep?: Step
}

export { ConfirmationMethod, Step, type StepComponentProps,type StepContext }
