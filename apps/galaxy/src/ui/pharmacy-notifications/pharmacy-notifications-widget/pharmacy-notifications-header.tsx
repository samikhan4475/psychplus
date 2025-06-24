import {  Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'

const PharmacyNotificationHeader = () => {


  return (
    <TabContentHeading title={`Pharmacy Notifications`}>
      <Flex align="center" justify="end" gap="2" className="flex-1">
      </Flex>
    </TabContentHeading>
  )
}

export { PharmacyNotificationHeader }
