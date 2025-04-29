import { Flex, Separator, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { VitalSignData } from '@/ui/procedures/spravato-tab/vital-signs/add-vital-signs/types'
import { VitalSignsDetails } from './vital-signs-details'
import { VitalSignsTable } from './vital-signs-table'

interface VitalSignsProps {
  data: SpravatoWidgetSchemaType
}

const VitalSigns = ({ data }: VitalSignsProps) => {
  const vitalsData: VitalSignData[] = data['vitalSigns']

  return vitalsData.length > 0 ? (
    <Flex direction="column" gap="1">
      <Text className="whitespace-nowrap text-3 font-[600]">Vital Signs</Text>
      <VitalSignsTable vitalSigns={vitalsData} />
      <VitalSignsDetails vitalSigns={vitalsData} />
      <Separator className="my-3 w-full" />
    </Flex>
  ) : null
}

export { VitalSigns }
