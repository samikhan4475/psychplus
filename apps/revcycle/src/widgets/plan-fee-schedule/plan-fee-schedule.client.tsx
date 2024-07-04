'use client'

import { PlanFeeScheduleTable } from './components'

const PlanSchedulesWidgetClient = ({ payerId }: { payerId: string }) => (
  <PlanFeeScheduleTable payerId={payerId} />
)

export { PlanSchedulesWidgetClient }
