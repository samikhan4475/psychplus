import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { ContinueWithCurrentProtocol } from './continue-with-current-protocol'
import { ContinueWithMaintenance } from './continue-with-maintenance'
import { DiscontinueTreatment } from './discontinue-treatment'
import { Plan } from './plan'
import { PostTreatmentTransportation } from './post-treatment-transportation'
import { Referral } from './referral'

const DischargePlan = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  return (
    <Flex direction="column" gap="2">
      <Text className="whitespace-nowrap text-3 font-[600]">
        Discharge Plan
      </Text>
      <Plan data={data} />
      <ContinueWithCurrentProtocol data={data} />
      <ContinueWithMaintenance data={data} />
      <DiscontinueTreatment data={data} />
      <Referral data={data} />
      <PostTreatmentTransportation data={data} />
    </Flex>
  )
}

export { DischargePlan }
