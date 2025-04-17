'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { useStore } from './store'
import { Permission } from './types'

interface ProfileContentHeadingProps {
  title: string
  permissionId?: string
  permissions?: Permission[]
}

const ProfileContentHeading = ({
  title,
  permissions,
  permissionId,
}: ProfileContentHeadingProps) => {
  const { setSelectedPermissions, selectedPermissions } = useStore((state) => ({
    setSelectedPermissions: state.setSelectedPermissions,
    selectedPermissions: state.selectedPermissions,
  }))

  const enableAll = () => {
    if (!permissionId) {
      return
    }
    const compiled = selectedPermissions
    permissions?.forEach((permission) => {
      if (!compiled[permissionId]) {
        compiled[permissionId] = []
      }
      compiled[permissionId].push(permission.id)
    })
    setSelectedPermissions(compiled)
  }

  const disableAll = () => {
    if (!permissionId) {
      return
    }
    const newList = selectedPermissions
    newList[permissionId] = []
    setSelectedPermissions(newList)
  }

  return (
    <Flex
      className=" my-1 h-[24px] w-full gap-1 px-2 py-1"
      align="center"
      justify="between"
    >
      <Text className="text-black text-[16px]" weight="medium">
        {title}
      </Text>
      <Flex gap="2">
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={enableAll}
        >
          Enable All
        </Button>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={disableAll}
        >
          Disable All
        </Button>
      </Flex>
    </Flex>
  )
}

export { ProfileContentHeading }
