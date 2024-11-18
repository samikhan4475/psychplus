import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { WEEK_DETAILS } from '@/ui/procedures/tms-tab/treatment-session/protocol-used/blocks'
import { WeekDetail } from '@/ui/procedures/tms-tab/treatment-session/protocol-used/blocks/week-detail-block'

const StandardProtocolSection = () => {
  return (
    <Flex direction={'column'} gap="2">
      <Text className="text-1 font-medium">
        Involves a total of 30-36 sessions scheduled daily over 4-6 weeks,
        followed by a tapering phase of 6 sessions over the following 3 weeks
      </Text>
      {WEEK_DETAILS.map((weekDetail) => (
        <WeekDetail
          key={weekDetail.id}
          description={weekDetail.description}
          title={weekDetail.title}
        />
      ))}
    </Flex>
  )
}

export { StandardProtocolSection }
