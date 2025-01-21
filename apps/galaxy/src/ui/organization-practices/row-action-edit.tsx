'use client'

import { type PropsWithRow } from '@/components'
import { PracticeDetails } from './types'
import { IconButton } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Practice } from '../organization-practice/types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<Practice>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
