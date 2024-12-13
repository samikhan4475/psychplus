'use client'

import { IconButton } from '@radix-ui/themes'
import { CircleCheckBig } from 'lucide-react'

const ViewActionSave = () => {
  return (
    <IconButton size="3" color="gray" variant="ghost" type="submit">
      <CircleCheckBig color="black" width={16} height={16} />
    </IconButton>
  )
}

export { ViewActionSave }
