import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { MessageSearch } from './message-search'
import { NewEmailButton } from './new-email-button'
import { ShowFilter } from './show-filter'
import { ShowFiltersButton } from './show-filter-button'

const MessageHeader = () => {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <>
      <Flex
        justify="between"
        align="center"
        gap="2"
        className="bg-white h-9 w-full p-2"
      >
        <MessageSearch />
        <Flex gap="2">
          <ShowFiltersButton
            showFilter={showFilter}
            onClick={() => setShowFilter(!showFilter)}
          />
          <NewEmailButton />
        </Flex>
      </Flex>
      <ShowFilter showFilter={showFilter} />
    </>
  )
}

export { MessageHeader }
