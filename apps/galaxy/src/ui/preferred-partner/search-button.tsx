'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const SearchButton = () => {
  return (
    <Button type="submit" size="1" highContrast>
      <MagnifyingGlassIcon width="14px" height="14px" />
    </Button>
  )
}

export { SearchButton }
