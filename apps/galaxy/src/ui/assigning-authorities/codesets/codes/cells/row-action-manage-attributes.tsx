'use client'

import { type PropsWithRow } from '@/components'
import { ManageAttributesButton } from '@/ui/assigning-authorities/codesets/codes/buttons'
import { Code } from '@/ui/assigning-authorities/types'

const RowActionManageAttributes = ({ row }: PropsWithRow<Code>) => {
  return <ManageAttributesButton code={row.original} />
}

export { RowActionManageAttributes }
