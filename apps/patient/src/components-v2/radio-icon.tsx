'use client'

import { cn } from '@psychplus-v2/utils'
import { Box } from '@radix-ui/themes'

const RadioIcon = ({ checked }: { checked?: boolean }) => {
  return (
    <Box
      className={cn(
        'rounded-full h-[12px] w-[12px] border border-[#194595]',
        checked ? ' border-[3.5px] ' : '  border-[1px] ',
      )}
    />
  )
}

export default RadioIcon
