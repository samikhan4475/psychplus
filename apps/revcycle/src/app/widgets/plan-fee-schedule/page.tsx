'use client'

import { Box, Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { PlanSchedulesWidgetClient } from '@/widgets/plan-fee-schedule'

const MissingPayerId = <Text>Payer is required</Text>

const PlanFeeScheduleWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => (
  <Box>
    {!searchParams.payerId ? (
      MissingPayerId
    ) : (
      <PlanSchedulesWidgetClient payerId={searchParams.payerId} />
    )}
  </Box>
)

export default PlanFeeScheduleWidgetPage
