'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SearchAddMemberSelect } from './search-add-member'

const ClinicalStaffHeader = ({
  staffId,
  setAlertInfo,
}: {
  staffId: string
  setAlertInfo: (alertInfo: { message: string; isOpen: boolean }) => void
}) => {
  return (
    <Flex className="bg-white w-[90%] items-center justify-between gap-3 pb-2 sm:w-[80%] md:w-[50%] z-50">
      <Text size="4" weight="medium" className=" whitespace-nowrap">
        Clinical Support Staff
      </Text>
      <SearchAddMemberSelect staffId={staffId} setAlertInfo={setAlertInfo} />
    </Flex>
  )
}

export { ClinicalStaffHeader }
