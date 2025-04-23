'use client'

import { Checkbox, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const TestStaffCheckbox = () => {
  const { watch, setValue } = useFormContext()

  const isTestStaff = watch('isTest')

  const handleCheckboxChange = (checked: boolean) => {
    setValue('isTest', checked)
  }

  return (
    <Text size="1" className="flex select-none items-center gap-2" as="label">
      <Checkbox
        checked={isTestStaff}
        onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
        highContrast
        className="cursor-pointer"
      />
      Test Staff
    </Text>
  )
}

export { TestStaffCheckbox }
