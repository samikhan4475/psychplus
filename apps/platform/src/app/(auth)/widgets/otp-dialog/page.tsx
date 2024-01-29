import { OTPDialog } from '@psychplus/widgets/patient'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'OTP Dialog'
const DESCRIPTION = 'A dialog form for inputting a one-time password.'

const OTPDialogPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <OTPDialog />
    </>
  )
}

export default OTPDialogPage
