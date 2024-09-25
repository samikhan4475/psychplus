'use client'

import { Button, Flex } from '@radix-ui/themes'
import { SearchButton } from '../shared'
import { PropsWithChildren } from 'react'

const FiltersButtonsGroup = ({children}: PropsWithChildren) => {
  return (
    <Flex align="center" className="flex-1 " gap="2">
      {children}
      <Button variant="outline" color="gray" size="1">
        Clear
      </Button>
      <SearchButton />
    </Flex>
  )
}

export { FiltersButtonsGroup }
