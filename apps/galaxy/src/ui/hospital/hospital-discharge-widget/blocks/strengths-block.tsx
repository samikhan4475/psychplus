'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { GroupSelectSection, SelectableChipDetails } from '@/components'
import { HospitalDischargeWidgetSchemaType } from '../hospital-discharge-widget-schema'

const BLOCK_ID = 'strengths'
const BLOCK_LABEL = 'Strengths'

const BLOCK_OPTIONS = [
  {
    label: 'Age',
    value: 'Age',
  },
  {
    label: 'Family',
    value: 'Family',
  },
  {
    label: 'Make Decisions',
    value: 'Make Decisions',
  },
  {
    label: 'Communicate',
    value: 'Communicate',
  },
  {
    label: 'Social Support',
    value: 'Social Support',
  },
  {
    label: 'Children',
    value: 'Children',
  },
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const StrengthsBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  const hasError = form.formState.errors?.strengths
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
          key="strengthsOtherDescription"
          label="Text"
          type="text"
          field="strengthsOtherDescription"
          showIndicator={false}
          maxLength={500}
        />
      )}
    </Flex>
  )
}

export { StrengthsBlock }
