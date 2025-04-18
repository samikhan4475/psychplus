'use client'

import { Flex, Text } from '@radix-ui/themes'
import { StaffRoleSelect } from './staff-role-select'
import { StaffSelect } from './staff-select'

const OrganizationStaffRoleHeading = () => {
  return (
    <Flex className="bg-white h-[32px] w-full" align="center" gap="5">
      <Flex>
        <Text className="text-black text-[16px]" weight="medium">
          Staff Roles
        </Text>
      </Flex>
      <Flex direction="row" className="gap-8">
        <StaffSelect />
        <StaffRoleSelect />
      </Flex>
    </Flex>
  )
}

export { OrganizationStaffRoleHeading }
