import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChipDetails, YesNoSelect } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'

const BLOCK_ID = 'physicalConditionWNL'
const BLOCK_LABEL = 'Physical Condtion WNL'

const BLOCK_OPTIONS = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]

const PhysicalConditionBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const physicalCondtion = form.watch('physicalConditionWNL')
  return (
    <Flex>
      <YesNoSelect
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        lastOptionIndicator={true}
        errorField={BLOCK_ID}
      />
      {physicalCondtion === 'No' && (
        <SelectableChipDetails
          key="physicalConditionDescription"
          label="Text"
          type="text"
          field="physicalConditionDescription"
          showIndicator={false}
          maxLength={500}
        />
      )}
    </Flex>
  )
}

export { PhysicalConditionBlock }
