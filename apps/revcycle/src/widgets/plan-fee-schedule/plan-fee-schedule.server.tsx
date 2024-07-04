import { PlanFeeScheduleTable } from './components'

const PlanSchedulesWidgetServer = ({ payerId }: { payerId: string }) => (
  <PlanFeeScheduleTable payerId={payerId} />
)

export { PlanSchedulesWidgetServer }
