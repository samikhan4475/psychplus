import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const ContinueWithMaintenance = ({
  data,
}: {
  data: SpravatoWidgetSchemaType
}) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const continueWithMaintainanceBlock = data[
    'continueWithMaintainanceBlock' as keyof SpravatoWidgetSchemaType
  ] as { treatmentFrequency: string; treatmentPerUnit: string }

  return (
    plan.includes('Continue with Maintenance') && (
      <Flex direction="column" gap="1">
        <Text className="text-2 font-medium">Continue with Maintenance</Text>
        <Flex direction="row" gap="1" align="center">
          <Text className="text-1 font-[600]">Treatment Frequency</Text>
          <Text className="text-pp-gray-1 text-1 font-regular">
            {continueWithMaintainanceBlock?.treatmentFrequency}
          </Text>
          <Text className="text-1 font-[600]">treatments per</Text>
          <Text className="text-pp-gray-1 text-1 font-regular">
            {continueWithMaintainanceBlock?.treatmentPerUnit}
          </Text>
        </Flex>
      </Flex>
    )
  )
}

export { ContinueWithMaintenance }
