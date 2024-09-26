'use client'

import { IconButton } from '@radix-ui/themes'
import { DollarIcon } from '@/components/icons'

const ViewFinancialButton = () => {
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      className="text-black !m-0"
    >
      <DollarIcon />
    </IconButton>
  )
}

export { ViewFinancialButton }
