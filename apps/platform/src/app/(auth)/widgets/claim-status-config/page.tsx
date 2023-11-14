import { ClaimStatusConfigWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Claim Status Configuration'
const DESCRIPTION = 'Manage custom claim statuses.'

const ClaimStatusConfigWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[675px] w-[900px]">
      <ClaimStatusConfigWidget />
    </div>
  </>
)

export default ClaimStatusConfigWidgetPage
