import { Flex, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../shared'

interface SpravatoListViewProps {
  label?: string
  data: SpravatoWidgetSchemaType
  appointment?: Appointment
}

const DOSING_SECTION: {
  label: string
  key: string
  value?: string
  direction?: string
}[] = [
  {
    label: 'Treatment Number:',
    key: 'treatmentNumber',
  },
  {
    label: 'Dose Adminstered:',
    key: 'doseAdminstered',
    value: 'Selected Option',
  },
  {
    label: 'Lot Number:',
    key: 'lotNumber',
    value: '00',
  },
]

const getValueForKey = (
  key: string,
  data: SpravatoWidgetSchemaType,
  appointment?: Appointment,
  defaultValue?: string,
) => {
  if (key === 'treatmentNumber' && appointment?.encounterNumber) {
    return appointment?.encounterNumber?.split('-')[1] || ''
  }

  const dataValue = data[key as keyof SpravatoWidgetSchemaType]
  if (dataValue) {
    return dataValue.toString()
  }

  return defaultValue || ''
}
const SpravatoListView = ({
  label,
  data,
  appointment,
}: SpravatoListViewProps) => {
  return (
    <Flex direction="column">
      {label && (
        <Text className="whitespace-nowrap text-3 font-[600]">{label}</Text>
      )}
      {DOSING_SECTION.map((option) =>
        option.direction === 'column' ? (
          <></>
        ) : (
          <LabelAndValue
            key={option.label}
            label={option.label}
            value={getValueForKey(option.key, data, appointment, option?.value)}
          />
        ),
      )}
    </Flex>
  )
}

export { SpravatoListView }
