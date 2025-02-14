import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChipDetails, YesNoSelect } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'

const BLOCK_ID = 'ableToPerformAdls'
const BLOCK_LABEL = 'Able To Perform ADLs'

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

const AbleToPerformADLBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const ableToPerformADL = form.watch('ableToPerformAdls')

  return (
    <Flex>
      <YesNoSelect
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        lastOptionIndicator={true}
      />
      {ableToPerformADL === 'No' && (
        <SelectableChipDetails
          key="ableToPerformAdlsDescription"
          label="Text"
          type="text"
          field="ableToPerformAdlsDescription"
          maxLength={500}
          showIndicator={false}
        />
      )}
    </Flex>
  )
}

export { AbleToPerformADLBlock }
