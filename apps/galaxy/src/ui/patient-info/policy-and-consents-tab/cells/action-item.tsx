import { ElementType } from 'react'
import { DropdownMenu, IconButton } from '@radix-ui/themes'

interface ActionItemProps {
  Icon: ElementType
  title?: string
  onClick?: () => void
  disabled?: boolean
}

const ActionItem = ({
  Icon,
  title,
  onClick,
  disabled = false,
}: ActionItemProps) => {
  if (!title) {
    return (
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    )
  }

  return (
    <DropdownMenu.Item
      className="!text-pp-black-3 hover:bg-gray-3 data-[disabled]:!cursor-not-allowed data-[disabled]:!opacity-70"
      onClick={onClick}
      onSelect={(e) => e.preventDefault()}
      disabled={disabled}
    >
      <Icon width={16} height={16} className="text-pp-gray-1" />
      {title}
    </DropdownMenu.Item>
  )
}

export { ActionItem }
