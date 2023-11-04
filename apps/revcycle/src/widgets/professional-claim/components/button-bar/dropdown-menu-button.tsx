import React from 'react'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'

interface DropdownMenuButtonProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  buttonLabel: string
  options: string[]
}

const DropdownMenuButton = ({
  leftIcon,
  rightIcon,
  buttonLabel,
  options,
}: DropdownMenuButtonProps) => {
  const onItemClick = (option: string, index: number) =>
    console.log('onItemClick', option, index)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>
          {leftIcon}
          {buttonLabel}
          {rightIcon}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((option: string, index: number) => (
          <DropdownMenu.Item
            onClick={() => onItemClick(option, index)}
            key={index}
          >
            {option}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { DropdownMenuButton }
