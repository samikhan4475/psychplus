import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { NewEmailButton } from './compose-email/new-email-button'
import { MessageSearch } from './message-search'
import { ShowFilter } from './show-filter'
import { ShowFiltersButton } from './show-filter-button'
import { ActiveComponent, ActiveComponentProps } from './types'

const MessageHeader = ({ setActiveComponent }: ActiveComponentProps) => {
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
          <NewEmailButton
            onClick={() => setActiveComponent(ActiveComponent.COMPOSE_MAIL)}
          />
        </Flex>
      </Flex>
      <ShowFilter showFilter={showFilter} />
    </>
  )
}

export { MessageHeader }
