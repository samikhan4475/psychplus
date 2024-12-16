'use client'

import { type PropsWithRow } from '@/components'
import { DownloadDownArrowIcon } from '@/components/icons'
import { IconButton } from '@radix-ui/themes'
import { Policy } from './types'

const RowActionDownload = ({
  row: { original: record },
}: PropsWithRow<Policy>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <DownloadDownArrowIcon width={16} height={16} className="text-black" />
    </IconButton>
  )
}

export { RowActionDownload }
