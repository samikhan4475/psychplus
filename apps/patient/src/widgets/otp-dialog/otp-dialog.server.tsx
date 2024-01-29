import { unstable_noStore as noStore } from 'next/cache'
import { OTPDialogClient } from './otp-dialog.client'

const OTPDialogServer = async () => {
  noStore()

  return <OTPDialogClient />
}

export { OTPDialogServer }
