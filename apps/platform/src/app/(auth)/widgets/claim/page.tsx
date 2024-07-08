import { ClaimWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Claim'
const DESCRIPTION = 'claim'

const ClaimWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <ClaimWidget />
  </>
)

export default ClaimWidgetPage
