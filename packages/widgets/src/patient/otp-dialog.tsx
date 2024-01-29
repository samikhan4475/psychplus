import { PATIENT_URL } from '@psychplus/utils/constants'
import { OTP_DIALOG } from '..'
import { DialogPortal } from '../components'

const OTPDialog = () => {
  return (
    <DialogPortal src={`${PATIENT_URL}/widgets/otp-dialog`} name={OTP_DIALOG} />
  )
}

export { OTPDialog }
