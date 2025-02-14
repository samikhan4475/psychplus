'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection, SelectableChipDetails } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../hospital-discharge-widget-schema'

const BLOCK_ID = 'dischargeType'
const BLOCK_LABEL = 'Discharge Type'

const BLOCK_OPTIONS = [
  {
    label: 'Routine',
    value: 'Routine',
  },
  {
    label: 'Request Early',
    value: 'Request Early',
  },
  {
    label: 'AMA',
    value: 'AMA',
  },
  {
    label: 'Transfer',
    value: 'Transfer',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const DischargeTypeBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const dischargeType = form.watch(BLOCK_ID)
  return (
    <Flex>
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        lastOptionIndicator={true}
      />
      {dischargeType === 'Other' && (
        <SelectableChipDetails
          key="dischargeTypeDescription"
          label="Text"
          type="text"
          field="dischargeTypeDescription"
          maxLength={500}
          showIndicator={false}
        />
      )}
    </Flex>
  )
}

export { DischargeTypeBlock }
