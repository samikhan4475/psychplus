import { PlanLogicSchedulesWidgetClient } from './logic-fee-plan.client'

const PlanLogicSchedulesWidgetServer = ({
  payerId,
  IsPreferredPartnerFeeSchedule,
}: {
  payerId: string
  IsPreferredPartnerFeeSchedule: boolean
}) => (
  <PlanLogicSchedulesWidgetClient
    payerId={payerId}
    IsPreferredPartnerFeeSchedule={IsPreferredPartnerFeeSchedule}
  />
)

export { PlanLogicSchedulesWidgetServer }
