'use client'

import { IconButton } from '@radix-ui/themes'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapseButtonProps {
  isOpen: boolean
  onOpenToggle: () => void
}

const CollapseButton = ({ isOpen, onOpenToggle }: CollapseButtonProps) => {
  return (
    <IconButton
      size="1"
      variant="outline"
      color="gray"
      className="border-pp-gray-2 h-6 w-6 border border-solid !outline-none [box-shadow:none]"
      onClick={onOpenToggle}
    >
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </IconButton>
  )
}

export { CollapseButton }
