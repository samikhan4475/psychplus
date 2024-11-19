import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const Referral = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const referral = data['referral' as keyof SpravatoWidgetSchemaType] as string

  return (
    plan.includes('Referral') && (
      <Flex direction="column" gap="1">
        <Text className="text-2 font-medium">Referral</Text>
        <Text className="text-pp-gray-1 text-1 font-regular">{referral}</Text>
      </Flex>
    )
  )
}

export { Referral }
