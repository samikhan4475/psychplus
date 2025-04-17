'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getPermissionsListAction } from './actions'
import { columns } from './columns'
import { ProfileContentHeading } from './profile-content-heading'
import { useStore } from './store'

interface PermissionsListTableProps {
  permissionId: string
  title: string
}

const PermissionsListTable = ({
  permissionId,
  title,
}: PermissionsListTableProps) => {
  const { setPermissions, permissions } = useStore((state) => ({
    setPermissions: state.setPermissions,
    permissions: state.permissions,
  }))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init(permissionId)
  }, [permissionId])

  const init = async (sactionCode: string) => {
    setLoading(true)
    const response = await getPermissionsListAction(sactionCode)
    if (response.state === 'success') {
      const newList = permissions ?? {}
      newList[permissionId] = response.data
      setPermissions(newList)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <ProfileContentHeading
        title={title}
        permissionId={permissionId}
        permissions={permissions?.[permissionId] ?? []}
      />
      <ScrollArea>
        <DataTable
          data={permissions?.[permissionId] ?? []}
          columns={columns(permissionId)}
          disablePagination
          sticky
          isRowSpan
          tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
        />
      </ScrollArea>
    </>
  )
}

export { PermissionsListTable }
