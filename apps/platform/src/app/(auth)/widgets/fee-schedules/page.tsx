import { FeeSchedulesWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Fee Schedules'
const DESCRIPTION = 'Manage fee schedules'

const FeeSchedulesWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[675px] w-[900px]">
      <FeeSchedulesWidget />
    </div>
  </>
)

export default FeeSchedulesWidgetPage
