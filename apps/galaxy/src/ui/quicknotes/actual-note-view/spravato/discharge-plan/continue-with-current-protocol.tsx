import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const ContinueWithCurrentProtocol = ({
  data,
}: {
  data: SpravatoWidgetSchemaType
}) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const continueWithCurrentProtocolBlock = data[
    'continueWithCurrentProtocolBlock' as keyof SpravatoWidgetSchemaType
  ] as { treatmentFrequency: string; treatmentPerUnit: string }

  return (
    plan.includes('Continue with Current Protocol') && (
      <Flex direction="column" gap="1">
        <Text className="text-2 font-medium">
          Continue with Current Protocol
        </Text>
        <Flex direction="row" gap="1" align="center">
          <Text className="text-1 font-[600]">Treatment Frequency</Text>
          <Text className="text-pp-gray-1 text-1 font-regular">
            {continueWithCurrentProtocolBlock?.treatmentFrequency}
          </Text>
          <Text className="text-1 font-[600]">treatments per</Text>
          <Text className="text-pp-gray-1 text-1 font-regular">
            {continueWithCurrentProtocolBlock?.treatmentPerUnit}
          </Text>
        </Flex>
      </Flex>
    )
  )
}

export { ContinueWithCurrentProtocol }
