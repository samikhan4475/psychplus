import { notFound } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { getUserPermissions } from '@/api/get-user-permissions'

const ManagementView = async () => {
  const permissions = await getUserPermissions()

  if (!permissions['mainTabManagementPermission']) return notFound()

  return (
    <Flex className="flex-1">
      <Text size="4">Management Page</Text>
    </Flex>
  )
}

export { ManagementView }
