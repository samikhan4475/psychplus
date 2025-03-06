'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { GroupSelectSection, SelectableChipDetails } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../hospital-discharge-widget-schema'

const BLOCK_ID = 'liabilites'
const BLOCK_LABEL = 'Liabilites'

const BLOCK_OPTIONS = [
  {
    label: 'Age',
    value: 'Age',
  },
  {
    label: 'Poor Coping',
    value: 'Poor Coping',
  },
  {
    label: 'Severe Symptoms',
    value: 'Severe Symptoms',
  },
  {
    label: 'Poor Support',
    value: 'Poor Support',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const LiabilitiesBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const hasError = form.formState.errors?.liabilites
  return (
    <Flex>
      <GroupSelectSection
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        hasChild
        chipClassName={`${hasError ? 'border border-tomato-11' : ''}`}
      />
      {form.watch(BLOCK_ID).includes('Other') && (
        <SelectableChipDetails
          key="liabilitesOtherDescription"
          label="Text"
          type="text"
          field="liabilitesOtherDescription"
          showIndicator={false}
          maxLength={500}
        />
      )}
    </Flex>
  )
}

export { LiabilitiesBlock }
