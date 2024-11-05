'use client'

import { Button } from '@radix-ui/themes'
import { Search } from 'lucide-react'

const SaveButton = () => {
  return (
    <Button size="1" highContrast type="submit">
      <Search width={14} height={14} />
    </Button>
  )
}

export { SaveButton }
