'use client'

import { DownloadIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { PatientStatement } from '../types'

const RowActionDownload = ({
  row: { original: record },
}: PropsWithRow<PatientStatement>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <DownloadIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDownload }
