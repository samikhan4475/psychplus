import { ClearingHouseWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Clearing House'
const DESCRIPTION = 'Clearing House'

const ClearingHouseWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[675px] w-[900px]">
      <ClearingHouseWidget />
    </div>
  </>
)

export default ClearingHouseWidgetPage
