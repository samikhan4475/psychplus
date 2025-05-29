import { Step } from './types'

const dialogTitles: Record<Step, string> = {
  [Step.Form]: 'Add Medication',
  [Step.Review]: 'Review and Sign Prescription',
  [Step.CredentialVerification]: 'Login to Verify',
  [Step.OrderConfirm]: 'Confirm Your Identity',
  [Step.Complete]: 'Prescription Complete',
}

export { dialogTitles }
