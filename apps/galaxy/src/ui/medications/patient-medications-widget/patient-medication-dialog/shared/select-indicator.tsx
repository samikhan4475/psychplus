'use client'

import { Box } from 'lucide-react'

const SelectedIndicator = ({ className }: { className?: string }) => {
  return (
    <Box
      className={`border-l-pp-focus-outline h-0 w-0 border-y-[4px] border-l-[5px] border-y-transparent ${
        className ?? ''
      }`}
    ></Box>
  )
}

export { SelectedIndicator }
