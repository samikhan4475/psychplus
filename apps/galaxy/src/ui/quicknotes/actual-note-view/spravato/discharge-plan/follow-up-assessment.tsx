import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const FollowUpAssessment = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const plan = data['plan' as keyof SpravatoWidgetSchemaType] as string[]
  const followUpScreening = data[
    'followUpScreening' as keyof SpravatoWidgetSchemaType
  ] as string[]

  return (
    plan.includes('Follow up Assessment Screening') && (
      <Flex direction="row" gap="1" align="center">
        <Text className="text-2 font-medium">
          Follow up Assessment Screening
        </Text>
        <Text className="text-pp-gray-1 text-1 font-regular">
          {followUpScreening.join(', ')}
        </Text>
      </Flex>
    )
  )
}

export { FollowUpAssessment }
