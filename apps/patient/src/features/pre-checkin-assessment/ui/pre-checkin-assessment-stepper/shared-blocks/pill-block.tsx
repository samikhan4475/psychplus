'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  DetailsType,
  SelectableChipDetails,
} from '@/components-v2/selectable-chip-details'

interface PillBlockProps {
  data: {
    label: string
    value: string
    fieldName?: string
    details?: {
      type: DetailsType
      label?: string
      field: string
      hideSelectedCount?: boolean
      options?: { label: string; value: string }[]
      showIndicator?: boolean
      placeHolder?: string
      format?: string
      isDisabled?: boolean
      isOptionsChip?: boolean
      className?: string
      rightLabel?: string
      editable?: boolean
      maxLength?: number
      isRequired?: boolean
    }
  }
  isSelected: boolean
  onToggle?: (value: string) => void
  formField: string
  complaintValue?: string
  relatedField?: string
}

const PillBlock = ({
  data,
  isSelected,
  onToggle,
  formField,
  complaintValue,
  relatedField,
}: PillBlockProps) => {
  const { watch, setValue, getValues } = useFormContext()
  const selected: string[] = watch(formField) || []

  const handleToggle = () => {
    const alreadySelected = selected.includes(data.value)
    const updatedSelections = alreadySelected
      ? selected.filter((v) => v !== data.value)
      : [...selected, data.value]
    setValue(formField, updatedSelections)
    if (onToggle) {
      onToggle(data.value)
      return
    }
    if (formField !== 'chiefComplaint') {
      const complaintKey = complaintValue
      if (complaintKey) {
        const currentComplaints: string[] = getValues('chiefComplaint') || []
        if (
          updatedSelections.length > 0 &&
          !currentComplaints.includes(complaintKey)
        ) {
          setValue('chiefComplaint', [...currentComplaints, complaintKey])
        } else if (updatedSelections.length === 0) {
          setValue(
            'chiefComplaint',
            currentComplaints.filter((c) => c !== complaintKey),
          )
        }
      }
    } else if (formField === 'chiefComplaint' && relatedField) {
      if (alreadySelected) {
        setValue(relatedField, [])
      }
    }
  }

  return (
    <Flex className="flex-row items-center">
      <Flex
        onClick={handleToggle}
        className={`cursor-pointer rounded-6 border border-gray-8 bg-[white] px-4 py-2 ${
          isSelected
            ? 'text-white border-pp-blue-3 bg-pp-blue-3'
            : `border-pp-gray-4`
        } `}
      >
        <Text
          className={`text-[14}] whitespace-nowrap capitalize`}
          weight={'medium'}
        >
          {data.label}
        </Text>
      </Flex>
      {isSelected && data.details && (
        <Flex className="items-center">
          <SelectableChipDetails {...data.details} />
        </Flex>
      )}
    </Flex>
  )
}

export default PillBlock
