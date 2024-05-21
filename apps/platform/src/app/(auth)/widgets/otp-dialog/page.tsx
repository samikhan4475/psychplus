import { unstable_noStore } from 'next/cache'
import { OTPDialog } from '@psychplus/widgets/patient'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'OTP Dialog'
const DESCRIPTION = 'A dialog form for inputting a one-time password.'

const OTPDialogPage = () => {
  unstable_noStore()

  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <OTPDialog />
    </>
  )
}

export default OTPDialogPage
