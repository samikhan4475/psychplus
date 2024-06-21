import { CodingWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Coding'
const DESCRIPTION = 'coding'

const CodingWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <CodingWidget />
  </>
)

export default CodingWidgetPage