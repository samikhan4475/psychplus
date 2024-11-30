'use client'
import { RadioSelectSection, SelectableChipDetails } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'
import { useFormContext } from 'react-hook-form'
import { Flex } from '@radix-ui/themes'

const BLOCK_ID = 'diet'
const BLOCK_LABEL = 'Diet'

const BLOCK_OPTIONS = [
  {
    label: 'Regular',
    value: 'Regular',
  },
  {
    label: 'Soft',
    value: 'Soft',
  },
  {
    label: 'Puree',
    value: 'Puree',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const DietBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const diet = form.watch(BLOCK_ID)
  return (
    <Flex>
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        lastOptionIndicator={true}
      />
      {diet == "Other" &&
        <SelectableChipDetails
          key={"dietOtherDescription"}
          label={"Text"}
          type={'text'}
          field={"dietOtherDescription"}
          showIndicator={false}
        />
      }
    </Flex>
  )
}

export { DietBlock }
