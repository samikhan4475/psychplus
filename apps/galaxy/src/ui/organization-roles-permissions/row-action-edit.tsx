'use client'

import { useParams, useRouter } from 'next/navigation'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Role } from '@/types'

const RowActionEdit = ({ row: { original: role } }: PropsWithRow<Role>) => {
  const addTab = useRootStore((state) => state.addTab)
  const { id, type } = useParams<{
    id: string
    type: string
  }>()

  const router = useRouter()
  const onEdit = () => {
    const href = `/management/organization-practice/${type}/${id}/organization-roles-permissions/${role.id}/profile`
    addTab({
      href,
      label: `${role.displayName} (Role)`,
    })
    router.replace(href)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />{' '}
    </IconButton>
  )
}

export { RowActionEdit }
