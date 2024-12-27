'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SearchAddMemberSelect } from './search-add-member'

const AdminHeader = () => {
  return (
    <Flex className="bg-white items-center justify-between gap-3 pb-2">
      <Text size="4" weight="medium" className=" whitespace-nowrap">
        Admin
      </Text>
      <SearchAddMemberSelect />
    </Flex>
  )
}

export { AdminHeader }
