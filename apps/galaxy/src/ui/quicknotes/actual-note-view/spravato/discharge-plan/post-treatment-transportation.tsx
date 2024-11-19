import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'

const PostTreatmentTransportation = ({
  data,
}: {
  data: SpravatoWidgetSchemaType
}) => {
  const postTreatmentTransportation = data[
    'postTreatmentTransportation' as keyof SpravatoWidgetSchemaType
  ] as string
  const othertransportation = data[
    'othertransportation' as keyof SpravatoWidgetSchemaType
  ] as string

  return (
    <Flex direction="column" gap="1">
      <Flex direction="row" gap="1" align="center">
        <Text className="text-2 font-medium">
          Post Treatment Transportation
        </Text>
        <Text className="text-pp-gray-1 text-1 font-regular">
          {postTreatmentTransportation}
        </Text>
      </Flex>
      {postTreatmentTransportation === 'Other' && (
        <>
          <Text className="text-1 font-medium">Other</Text>
          <Text className="text-pp-gray-1 text-1 font-regular">
            {othertransportation}
          </Text>
        </>
      )}
    </Flex>
  )
}

export { PostTreatmentTransportation }
