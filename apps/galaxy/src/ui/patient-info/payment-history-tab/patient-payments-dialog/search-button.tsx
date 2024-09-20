'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const SearchButton = () => {
  return (
    <Button variant="solid" highContrast size="1" type="submit">
      <MagnifyingGlassIcon />
    </Button>
  )
}

export { SearchButton }
