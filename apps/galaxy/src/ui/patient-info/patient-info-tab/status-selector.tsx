'use client'

import { useState } from 'react'
import { Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { CloseIcon, QuestionIcon, TickIcon } from '@/components/icons'
import { cn } from '@/utils'

const icons: Record<string, JSX.Element> = {
  pending: <QuestionIcon />,
  yes: <TickIcon />,
  no: <CloseIcon />,
}
const StatusSelector = () => {
  const [selectedOption, setSelectedOption] = useState(options[2]) // 'Pending' as default

  const handleChange = (value: string) => {
    const option = options.find((opt) => opt.value === value)
    if (option) {
      setSelectedOption(option)
    }
  }

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="text-pp-black-3 !text-2">
        Verification Status
      </FormFieldLabel>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="outline"
            color="gray"
            size="1"
            type="button"
            className="text-black min-w-[97px] justify-between capitalize !outline-none"
          >
            <Flex justify="start" gap="1">
              {icons[selectedOption?.value || 'pending']}
              {selectedOption?.label}
            </Flex>
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="p-0 shadow-3" color="gray">
          {options.map(({ label, value }) => (
            <DropdownMenu.Item
              onSelect={() => handleChange(value)}
              className={cn(
                'hover:bg-pp-gray-2 text-black h-6 px-2 !text-1 font-medium',
                {
                  'text-red-9': value === 'no',
                },
              )}
              key={value}
            >
              {icons[value]} {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </FormFieldContainer>
  )
}
const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
]
export { StatusSelector }
