'use client'

import { Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CloseIcon, QuestionIcon, TickIcon } from '@/components/icons'
import { cn } from '@/utils'

const icons: Record<string, JSX.Element> = {
  pending: <QuestionIcon />,
  yes: <TickIcon />,
  no: <CloseIcon />,
}
const StatusDropdown = () => {
  const form = useFormContext()
  const status = form.watch('verificationStatus')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          color="gray"
          size="1"
          type="button"
          className="text-black min-w-[97px] justify-between capitalize"
        >
          <Flex justify="start" gap="1">
            {icons[status?.toLowerCase()]}
            {status || 'Select'}
          </Flex>
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="p-0 shadow-3" color="gray">
        {options?.map(({ label, value }) => (
          <DropdownMenu.Item
            onSelect={() => {
              form.setValue('verificationStatus', value)
              form.trigger('verificationStatus')
            }}
            className={cn(
              'hover:bg-pp-gray-2 text-black h-6 px-2 !text-1 font-medium',
              {
                'text-red-9': value === 'no',
              },
            )}
            key={label}
          >
            {icons[value]} {label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
export default StatusDropdown
