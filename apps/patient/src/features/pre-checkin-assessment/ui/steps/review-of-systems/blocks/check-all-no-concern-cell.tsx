'use client'

import { Button } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { RosWidgetSchemaType } from '../review-of-systems-schema'

interface CheckAllNoConcernCellProps {
  form: UseFormReturn<RosWidgetSchemaType>
}
const noConcerns = {
  constitutional: ['ctNoConcerns'],
  entMouth: ['entNoConcerns'],
  cardiovascular: ['cvsNoConcerns'],
  eyes: ['eyesNoConcerns'],
  gastrointestinal: ['giNoConcerns'],
  respiratory: ['resNoConcerns'],
  skin: ['sknNoConcerns'],
  genitourinary: ['guNoConcerns'],
  neuro: ['neuNoConcerns'],
  musculoskeletal: ['msuNoConcerns'],
}

const CheckAllNoConcernCell: React.FC<CheckAllNoConcernCellProps> = ({
  form,
}) => {
  const handleSelectAllNormal = (checked: boolean) => {
    Object.keys(noConcerns).forEach((field) => {
      const fieldKey = field as keyof typeof noConcerns

      if (checked) {
        form.setValue(fieldKey, noConcerns[fieldKey])
      } else {
        const currentValues = form.getValues(fieldKey) as string[]
        const updatedValues = currentValues.filter(
          (value) => !noConcerns[fieldKey].includes(value),
        )
        form.setValue(fieldKey, updatedValues)
      }
    })
  }
  const isAllChecked = Object.entries(noConcerns).every(
    ([key, noConcernsValues]) =>
      noConcernsValues.every((value) =>
        (form.watch(key as keyof RosWidgetSchemaType) || []).includes(value),
      ),
  )

  const handleCheckAllChange = () => {
    handleSelectAllNormal(!isAllChecked)
  }

  const buttonClass = isAllChecked
    ? 'h-[28px] content-center rounded-[100px] border border-[#194595] px-3 text-[12px] font-[600] text-white bg-[#194595]'
    : 'bg-white h-[28px] content-center rounded-[100px] border border-[#194595] px-3 text-[12px] font-[600] text-[#194595]'

  return (
    <Button
      type="button"
      onClick={handleCheckAllChange}
      variant="outline"
      highContrast
      className={buttonClass}
    >
      No Concerns
    </Button>
  )
}

export { CheckAllNoConcernCell }
