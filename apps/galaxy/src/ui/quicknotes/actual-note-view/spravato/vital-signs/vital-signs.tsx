import { Flex, Separator, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import useAddVitals from '@/ui/procedures/spravato-tab/vital-signs/add-vital-signs/blocks/use-add-vitals'
import { VitalSignsDetails } from './vital-signs-details'
import { VitalSignsTable } from './vital-signs-table'

const VitalSigns = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  const vitalsData: any = data['vitalSigns' as keyof SpravatoWidgetSchemaType]
  const { buttonConfig } = useAddVitals(vitalsData ?? [])

  return vitalsData.length > 0 ? (
    <Flex direction="column" gap="1">
      <Text className="whitespace-nowrap text-3 font-[600]">Vital Signs</Text>
      <VitalSignsTable vitalSigns={vitalsData} />
      <VitalSignsDetails config={buttonConfig} />
      <Separator className="my-3 w-full" />
    </Flex>
  ) : null
}

export { VitalSigns }
