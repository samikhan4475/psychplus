
import { Flex } from '@radix-ui/themes'
import {PharmacyNotificationWidget} from './pharmacy-notifications-widget/pharmacy-notifications-widget'
const PharmacyNotificationView = () => {
  return (
    <Flex direction="column" width="100%">
        <PharmacyNotificationWidget />
    </Flex>
  )
}


export { PharmacyNotificationView }
