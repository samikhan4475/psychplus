'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SearchAddMemberSelect } from './search-add-member'

const ClinicalStaffHeader = () => {
  return (
    <Flex className="bg-white items-center justify-between gap-3 pb-2">
      <Text size="4" weight="medium" className=" whitespace-nowrap">
        Clinical Support Staff
      </Text>
      <SearchAddMemberSelect />
    </Flex>
  )
}

export { ClinicalStaffHeader }
