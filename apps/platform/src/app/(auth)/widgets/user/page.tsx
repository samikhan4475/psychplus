import { UserWidget } from '@psychplus/widgets'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'User Widget'
const DESCRIPTION = 'Displays user information.'

const UserWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[400px] w-[800px]">
      <UserWidget />
    </div>
  </>
)

export default UserWidgetPage
