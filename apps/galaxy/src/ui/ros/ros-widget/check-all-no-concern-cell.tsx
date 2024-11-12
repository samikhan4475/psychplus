'use client'

import { UseFormReturn } from 'react-hook-form'
import { CheckboxCell } from './checkbox-cell'
import { RosWidgetSchemaType } from './ros-widget-schema'

interface CheckAllNoConcernCellProps {
  form: UseFormReturn<RosWidgetSchemaType>
}

const CheckAllNoConcernCell: React.FC<CheckAllNoConcernCellProps> = ({
  form,
}) => {
  const noConcerns = {
    constitutional: ['ctNoConcerns'],
    entMouth: ['entNoConcerns'],
    eyes: ['eyesNoConcerns'],
    cardiovascular: ['cvsNoConcerns'],
    respiratory: ['resNoConcerns'],
    gastrointestinal: ['giNoConcerns'],
    genitourinary: ['guNoConcerns'],
    skin: ['sknNoConcerns'],
    musculoskeletal: ['msuNoConcerns'],
    neuro: ['neuNoConcerns'],
  }

  const isAllChecked = Object.entries(noConcerns).every(
    ([key, noConcernsValues]) =>
      noConcernsValues.every((value) =>
        (form.watch(key as keyof RosWidgetSchemaType) || []).includes(value),
      ),
  )
  const handleSelectAllNormal = (checked: boolean) => {
    Object.keys(noConcerns).forEach((field) => {
      const fieldKey = field as keyof typeof noConcerns

      if (checked) {
        form.setValue(fieldKey, noConcerns[fieldKey], { shouldDirty: true })
      } else {
        const currentValues = form.getValues(fieldKey) as string[]
        const updatedValues = currentValues.filter(
          (value) => !noConcerns[fieldKey].includes(value),
        )
        form.setValue(fieldKey, updatedValues, { shouldDirty: true })
      }
    })
  }

  const handleCheckAllChange = () => {
    handleSelectAllNormal(!isAllChecked)
  }

  return (
    <CheckboxCell
      label="Check No Concerns"
      checked={isAllChecked}
      onClick={handleCheckAllChange}
    />
  )
}

export { CheckAllNoConcernCell }
