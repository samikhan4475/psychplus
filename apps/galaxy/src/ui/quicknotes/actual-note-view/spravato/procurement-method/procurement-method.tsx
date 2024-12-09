import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../../shared'

const ProcurementMethod = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const procurementMethod = data[
    'procurementMethod' as keyof SpravatoWidgetSchemaType
  ] as string

  return (
    <Flex direction="column" gap="2">
      <Text className="whitespace-nowrap text-3 font-[600]">
        Procurement Method
      </Text>

      <LabelAndValue label="Selected Method:" value={procurementMethod} />
    </Flex>
  )
}

export { ProcurementMethod }
