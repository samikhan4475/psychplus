import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const Plan = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]

  return (
    <Flex direction="row" gap="1" align="center">
      <Text className="text-2 font-[600]">Plan</Text>
      {plan.length > 0 && (
        <Text className="text-pp-gray-1 text-2 font-regular">
          {plan.join(', ')}
        </Text>
      )}
    </Flex>
  )
}

export { Plan }
