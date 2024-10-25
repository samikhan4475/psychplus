import React from 'react'
import { RadioGroup } from '@radix-ui/themes'

const RadioButton = ({
  onValueChange,
  rootValue,
  childValue,
}: {
  onValueChange: () => void
  rootValue: string
  childValue: string
}) => {
  return (
    <RadioGroup.Root
      size="1"
      color="indigo"
      value={rootValue}
      highContrast
      onValueChange={onValueChange}
    >
      <RadioGroup.Item className="text-[#151B4A]" value={childValue} />
    </RadioGroup.Root>
  )
}

export { RadioButton }
