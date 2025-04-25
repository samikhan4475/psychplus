'use client'

import { useRouter } from 'next/navigation'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Staff } from '../types'

const RowActionEdit = ({ row: { original: record } }: PropsWithRow<Staff>) => {
  const router = useRouter()

  const addTab = useRootStore((state) => state.addTab)
  const onEdit = (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    e.stopPropagation()
    const href = `/staff/${record.id}/profile?id=${record.userId}`
    addTab({
      href,
      label: `${record?.legalName?.firstName} ${record.legalName?.lastName} - ${record?.id}`,
    })
    router.push(href)
  }

  return (
    <IconButton onClick={onEdit} size="1" color="gray" variant="ghost">
      <Pencil1Icon
        onClick={onEdit}
        width={16}
        height={16}
        className="text-pp-gray-1"
      />
    </IconButton>
  )
}

export { RowActionEdit }
