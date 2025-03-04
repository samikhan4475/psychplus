'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'

const SearchButton = () => {
  return (
    <Button size="1" variant="solid" highContrast type="submit">
      <SearchIcon width={14} height={14} />
    </Button>
  )
}

export { SearchButton }
