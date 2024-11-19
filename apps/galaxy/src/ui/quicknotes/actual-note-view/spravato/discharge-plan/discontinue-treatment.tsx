import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const DiscontinueTreatment = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const discontinueTreatment = data[
    'discontinueTreatment' as keyof SpravatoWidgetSchemaType
  ] as string

  return (
    plan.includes('Discontinue Treatment') && (
      <Flex direction="column" gap="1">
        <Text className="text-2 font-medium">Discontinue Treatment</Text>
        <Text className="text-pp-gray-1 text-1 font-regular">
          {discontinueTreatment}
        </Text>
      </Flex>
    )
  )
}

export { DiscontinueTreatment }
