'use client'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { cn } from '@psychplus/ui/cn'

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroup.Item> {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const RadioGroupItem = ({
  id,
  value,
  children,
  className = 'pl-[12px]',
  disabled,
}: RadioGroupItemProps) => {
  return (
    <div className="flex items-center">
      <RadioGroup.Item
        value={value}
        id={id}
        className={cn(
          'rounded-full bg-white h-[16px] w-[16px] cursor-pointer border border-gray-11',
          {
            'cursor-not-allowed': disabled,
          },
        )}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-accent-12 after:content-['']" />
      </RadioGroup.Item>
      <label className={className} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

export { RadioGroupItem }
