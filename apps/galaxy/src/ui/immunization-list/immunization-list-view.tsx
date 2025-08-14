import { Flex } from '@radix-ui/themes'
import { ImmunizationListWidget } from './immunization-list-widget'

const ImmunizationListView = async () => {
  return (
    <Flex direction="column" width="100%" gap="2">
      <ImmunizationListWidget />
    </Flex>
  )
}

export { ImmunizationListView }
