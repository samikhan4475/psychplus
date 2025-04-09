import { useState } from 'react'
import { DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { EllipsisIcon, Link } from 'lucide-react'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import type { Claim } from '@/types'
import { LinkClaimDialog } from '../link-claim'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { useStore } from './store'

type ClaimRow = Row<Claim>

const rowActions: RowAction<Claim>[] = [
  {
    id: 'claim-list-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'claim-list-row-action-delete',
    render: RowActionDelete,
  },
]

interface ActionsCellProps {
  row: ClaimRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const [openLinkClaimDialog, setOpenLinkClaimDialog] = useState(false)
  const [open, setOpen] = useState(false);

  const handleClaimNumberClick = () => {
    setOpenLinkClaimDialog(true)
    setOpen(false);
  }
  return (
    <>
      {openLinkClaimDialog && (
        <LinkClaimDialog
          openDialog={openLinkClaimDialog}
          handleCloseModal={() => setOpenLinkClaimDialog(false)}
          row={row.original}
        />
      )}
      <AdaptiveRowActionsCell actions={rowActions} row={row} />
      {!row.original.appointmentId && (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger>
            <IconButton
              size="1"
              color="gray"
              variant="ghost"
              className="ml-1 mr-1"
            >
              <EllipsisIcon size={14} className="text-pp-black-3" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start" size="1" className="cursor-pointer">
            <Flex
              justify="between"
              gap="2"
              align="center"
              width="100%"
              onClick={handleClaimNumberClick}
            >
              <Link size={15} />
              <Text size="2" className="text-black">
                Link Claim with Visit
              </Text>
            </Flex>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  )
}

export { ActionsCell }
