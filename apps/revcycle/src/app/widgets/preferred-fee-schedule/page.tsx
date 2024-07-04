'use client'

import { Box, Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { PreferredFeeSchedulesWidgetClient } from '@/widgets/preferred-fee-schedule'

const MissingPayerId = <Text>Payer is required</Text>

const PreferredFeeWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => (
  <Box>
    {!searchParams.payerId ? (
      MissingPayerId
    ) : (
      <PreferredFeeSchedulesWidgetClient payerId={searchParams.payerId} />
    )}
  </Box>
)

export default PreferredFeeWidgetPage
