import { Theme } from '@radix-ui/themes'
import { AddExtReferralServer } from '@/widgets/ext-referrals'
import '../../../../(portal)/base.css'

const AddExtReferralPage = () => {
  return (
    <Theme accentColor="blue" radius="full">
      <AddExtReferralServer />
    </Theme>
  )
}

export default AddExtReferralPage
