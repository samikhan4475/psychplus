'use client'

import { useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PayerResponse } from '@/types'
import { EditPayerDialog } from '../dialogs/edit-payer-dialog'

interface ActionsCellProps {
  row: Row<PayerResponse>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <EditPayerDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        payer={row.original}
      />
      <IconButton variant="ghost" onClick={() => setEditOpen(true)}>
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
