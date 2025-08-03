'use client'

import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { useOrganizationMember } from '@/hooks'
import { StaffRoleSelect } from './staff-role-select'
import { StaffSelect } from './staff-select'

const OrganizationStaffRoleHeading = () => {
  const { id } = useParams<{ id: string }>()
  const isMember = useOrganizationMember(id ?? '')
  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }

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
