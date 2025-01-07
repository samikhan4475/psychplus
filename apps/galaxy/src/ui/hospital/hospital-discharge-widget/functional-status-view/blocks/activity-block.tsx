'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioSelectSection, SelectableChipDetails } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../../hospital-discharge-widget-schema'

const BLOCK_ID = 'activity'
const BLOCK_LABEL = 'Activity'

const BLOCK_OPTIONS = [
  {
    label: 'as needed',
    value: 'as needed',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const ActivityBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const activity = form.watch(BLOCK_ID)
  return (
    <Flex>
      <RadioSelectSection
        label={BLOCK_LABEL}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        lastOptionIndicator={true}
      />
      {activity == 'Other' && (
        <SelectableChipDetails
          key={'activityOtherDescription'}
          label={'Text'}
          type={'text'}
          field={'activityOtherDescription'}
          showIndicator={false}
        />
      )}
    </Flex>
  )
}

export { ActivityBlock }
