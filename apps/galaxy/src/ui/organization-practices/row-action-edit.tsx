'use client'

import { useRouter } from 'next/navigation'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Practice } from '../organization-practice/types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<Practice>) => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)

  const openTab = () => {
    const href = `/management/organization-practice/practices/${record.id}/practices-profile`
    addTab({
      href,
      label: `${record?.displayName} (Practice)`,
    })
    router.push(href)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={openTab}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
