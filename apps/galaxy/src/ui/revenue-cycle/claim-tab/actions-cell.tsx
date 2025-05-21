import { useState } from 'react'
import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { EllipsisIcon } from 'lucide-react'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { type Claim } from '@/types'
import { ClaimReSubmitDialog } from '../dialogs/claim-resubmit-dialog'
import { LinkClaimDialog } from '../link-claim'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RowActionResubmit } from './row-action-resubmit'
import RowLinkClaimAction from './row-link-claim-action'

type ClaimRow = Row<Claim>

const rowActions: RowAction<Claim>[] = [
  { id: 'claim-list-row-action-edit', render: RowActionEdit },
  { id: 'claim-list-row-action-delete', render: RowActionDelete },
]

interface ActionsCellProps {
  row: ClaimRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const [openLinkClaimDialog, setOpenLinkClaimDialog] = useState(false)
  const [openResubmitClaimDialog, setOpenResubmitClaimDialog] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const hasAppointment = !!row.original.appointmentId
  const handleLinkClaim = () => {
    setOpenLinkClaimDialog(true)
    setDropdownOpen(false)
  }

  const handleResubmitClaim = () => {
    setOpenResubmitClaimDialog(true)
    setDropdownOpen(false)
  }

  return (
    <>
      <AdaptiveRowActionsCell actions={rowActions} row={row} />

      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
          {!hasAppointment && (
            <DropdownMenu.Item onSelect={handleLinkClaim}>
              <RowLinkClaimAction />
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item onSelect={handleResubmitClaim}>
            <RowActionResubmit row={row} />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {openResubmitClaimDialog && (
        <ClaimReSubmitDialog
          open={openResubmitClaimDialog}
          onToggle={() => setOpenResubmitClaimDialog((prev) => !prev)}
          row={row}
        />
      )}

      {openLinkClaimDialog && (
        <LinkClaimDialog
          openDialog={openLinkClaimDialog}
          handleCloseModal={() => setOpenLinkClaimDialog(false)}
          row={row.original}
        />
      )}
    </>
  )
}

export { ActionsCell }
