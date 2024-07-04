'use client'

import { LogicFeeScheduleTable } from './components'

const PlanLogicSchedulesWidgetClient = ({
  payerId,
  IsPreferredPartnerFeeSchedule,
}: {
  payerId: string
  IsPreferredPartnerFeeSchedule: boolean
}) => (
  <LogicFeeScheduleTable
    payerId={payerId}
    IsPreferredPartnerFeeSchedule={IsPreferredPartnerFeeSchedule}
  />
)

export { PlanLogicSchedulesWidgetClient }
