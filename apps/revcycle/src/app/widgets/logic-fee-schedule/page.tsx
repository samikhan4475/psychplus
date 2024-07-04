'use client'

import { Box, Text } from '@radix-ui/themes'
import { type ScheduleFeeSearchParams } from '@psychplus/utils/url'
import { PlanLogicSchedulesWidgetClient } from '@/widgets/logic-fee-plan'

const MissingPayerId = <Text>Payer is required</Text>

const PlanFeeScheduleWidgetPage = ({
  searchParams,
}: {
  searchParams: ScheduleFeeSearchParams
}) => (
  <Box>
    {!searchParams.payerId ? (
      MissingPayerId
    ) : (
      <PlanLogicSchedulesWidgetClient
        payerId={searchParams.payerId}
        IsPreferredPartnerFeeSchedule={
          searchParams.IsPreferredPartnerFeeSchedule
        }
      />
    )}
  </Box>
)

export default PlanFeeScheduleWidgetPage
