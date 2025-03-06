import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChipDetails, YesNoSelect } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'

const BLOCK_ID = 'socialFunctioningWNL'
const BLOCK_LABEL = 'Social Functioning WNL'

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

const SocialFunctioningWNLBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const socialFunctioningWNL = form.watch('socialFunctioningWNL')
  return (
    <Flex>
      <YesNoSelect
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        lastOptionIndicator={true}
        errorField={BLOCK_ID}
      />
      {socialFunctioningWNL === 'No' && (
        <SelectableChipDetails
          key="socialFunctioningWNLDescription"
          label="Text"
          type="text"
          field="socialFunctioningWNLDescription"
          showIndicator={false}
          maxLength={500}
        />
      )}
    </Flex>
  )
}

export { SocialFunctioningWNLBlock }
