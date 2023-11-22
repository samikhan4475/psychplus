import { withAPI } from '@psychplus/ui/with-api'
import { FeeSchedulesWidgetServer } from '@/widgets/fee-schedules'

const FeeSchedulesWidgetPage = () => {
  return <FeeSchedulesWidgetServer />
}

export default withAPI(FeeSchedulesWidgetPage)
