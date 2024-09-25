'use client'

import { PropsWithRow, TextCell } from '@/components'
import { StaffComment } from '@/types'
import { cn } from '@/utils'

const CommentCell = ({
  row: {
    original: { recordStatus, staffCommment },
  },
}: PropsWithRow<StaffComment>) => {
  return (
    <TextCell
      className={cn({
        'text-pp-send-icon line-through': recordStatus == 'Deleted',
      })}
    >
      {staffCommment}
    </TextCell>
  )
}

export { CommentCell }
