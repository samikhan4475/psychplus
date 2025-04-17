'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Role } from '@/types'

const RowActionAddPractice = ({
  row: { original: role },
}: PropsWithRow<Role>) => {
  const addTab = useRootStore((state) => state.addTab)
  const router = useRouter()
  const { id, type } = useParams<{
    id: string
    type: string
  }>()

  const onEdit = () => {
    const href = `/management/organization-practice/${type}/${id}/organization-roles-permissions/${role.id}/permissions`
    addTab({
      href,
      label: `${role.displayName} (Role)`,
    })
    router.replace(href)
  }

  return role.rolePermissions ? (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onEdit}
    >
      Edit Permissions
    </Button>
  ) : (
    <Button size="1" type="button" highContrast onClick={onEdit}>
      Set Permissions
    </Button>
  )
}

export { RowActionAddPractice }
