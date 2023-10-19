import { UserWidgetPortal } from '@psychplus/widgets/client'
import { SectionHeader } from '../../shared/section-header'

const TITLE = 'User Widget'
const DESCRIPTION = 'Displays user information.'

const UserWidgetPage = () => (
  <>
    <SectionHeader title={TITLE} description={DESCRIPTION} />
    <div className="h-[400px] w-[800px]">
      <UserWidgetPortal />
    </div>
  </>
)

export default UserWidgetPage
