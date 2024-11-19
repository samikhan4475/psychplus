import { Flex, Text } from '@radix-ui/themes'
import {
  PRECAUTION_OPTIONS,
  RADIO_BUTTON_OPTIONS,
} from '@/ui/procedures/spravato-tab/sections/precaution-warning-options'
import { SpravatoWidgetSchemaType } from '@/ui/procedures/spravato-tab/spravato-widget-schema'
import { LabelAndValue } from '../shared'
import { LabelAndValueColumn } from './label-and-value-column'
import { getFormValue } from './utils'

const CheckedDetail = ({ label, value }: { label: string; value?: string }) => (
  <LabelAndValueColumn
    value={value === 'true' ? 'Checked' : ''}
    label={label}
  />
)

const PrecautionAndWarning = ({ data }: { data: SpravatoWidgetSchemaType }) => {
  return (
    <Flex direction="column" gap="2">
      <Text className="whitespace-nowrap text-3 font-[600]">
        Precaution & Warning
      </Text>
      <CheckedDetail
        label="The patient was assessed to determine if they are currently taking any of the following medication(s) that may cause sedation or blood pressure changes:"
        value={data[
          'medicationAssessment' as keyof SpravatoWidgetSchemaType
        ]?.toString()}
      />
      {RADIO_BUTTON_OPTIONS.map((item) => (
        <LabelAndValue
          key={item.field}
          label={`${item.label}:`}
          value={
            data[item.field as keyof SpravatoWidgetSchemaType]?.toString() ===
            'no'
              ? 'No'
              : 'Yes'
          }
        />
      ))}

      {PRECAUTION_OPTIONS.map((item) => (
        <CheckedDetail
          key={item.field}
          label={item.label}
          value={getFormValue(data, item.field)}
        />
      ))}
    </Flex>
  )
}

export { PrecautionAndWarning }
