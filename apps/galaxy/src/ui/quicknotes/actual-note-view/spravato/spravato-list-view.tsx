import { Flex, Text } from '@radix-ui/themes'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../shared'

interface SpravatoListViewProps {
  label?: string
  data: SpravatoWidgetSchemaType
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

const SpravatoListView = ({ label, data }: SpravatoListViewProps) => {
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
            value={
              option.key &&
              data[option.key as keyof SpravatoWidgetSchemaType]?.toString()
                ? data[option.key as keyof SpravatoWidgetSchemaType]?.toString()
                : option?.value ?? ''
            }
          />
        ),
      )}
    </Flex>
  )
}

export { SpravatoListView }
