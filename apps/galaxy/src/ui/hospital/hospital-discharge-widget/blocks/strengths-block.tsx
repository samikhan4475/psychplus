'use client'
import {
  GroupSelectSection, SelectableChipDetails,
} from '@/components'
import { Flex } from '@radix-ui/themes'
import { HospitalDischargeWidgetSchemaType } from '../hospital-discharge-widget-schema'
import { useFormContext } from 'react-hook-form'

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
    value: 'Make Decisions'
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
    label: 'Childern',
    value: 'Childern'
  },
  {
    label: 'Health',
    value: 'Health'
  },
  {
    label: 'Other',
    value: 'Other'
  }
]

const StrengthsBlock = () => {
  const form = useFormContext<HospitalDischargeWidgetSchemaType>()
  return (
    <Flex>
      <GroupSelectSection
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        label={BLOCK_LABEL}
        hasChild
      />
      {form.watch(BLOCK_ID).includes("Other") && <SelectableChipDetails
        key={"strengthsOtherDescription"}
        label={"Text"}
        type={'text'}
        field={"strengthsOtherDescription"}
        showIndicator={false}
      />
      }
    </Flex>
  )
}

export { StrengthsBlock }
