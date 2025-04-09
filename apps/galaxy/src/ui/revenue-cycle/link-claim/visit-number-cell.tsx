import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { TextCell } from '@/components'
import { Claim, PatientAppointments } from '@/types'
import { linkClaimAction } from '../actions'
import { useStore } from '../claim-tab/store'
import { LinkClaimConfirmationDialog } from './link-claim-confirmation-dialog'

interface VisitNumberCellProps {
  row: Row<PatientAppointments>
  claimData?: Claim
  handleCloseModal: () => void
}

const compareDates = (date1: string | Date, date2: string | Date) => {
  if (!date1 || !date2) return false

  const d1 = new Date(date1)
  const d2 = new Date(date2)

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

const VisitNumberCell = ({
  row,
  claimData,
  handleCloseModal,
}: VisitNumberCellProps) => {
  const isSameDate = compareDates(
    row?.original?.startDate ?? '',
    claimData?.dateOfServiceFrom ?? '',
  )

  const { claimsListSearch, claimsListPayload } = useStore((state) => ({
    claimsListSearch: state.claimsListSearch,
    claimsListPayload: state.claimsListPayload,
  }))

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }
  const handleVisitNumberClick = () => {
    if (!isSameDate) {
      toast.error(
        'Claim date of service and appointment date should be the same.',
      )
      return
    }
    setOpen(true)
  }
  const handleLinkClaimConfirmation = async () => {
    const { id } = row.original
    setLoading(true)
    const result = await linkClaimAction(String(claimData?.id), String(id))
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to link claim')
    } else {
      toast.success('Claim Linked successfully')
      claimsListSearch(claimsListPayload)
      handleCloseModal()
    }
    setLoading(false)
  }
  return (
    <>
      <LinkClaimConfirmationDialog
        isOpen={open}
        toggleOpen={toggleOpen}
        onConfirm={handleLinkClaimConfirmation}
        loading={loading}
      />
      <Box onClick={handleVisitNumberClick}>
        <TextCell
          className={
            isSameDate
              ? 'text-pp-text-primary-base bg-white cursor-pointer'
              : 'bg-white cursor-pointer'
          }
        >
          {row.original.id}
        </TextCell>
      </Box>
    </>
  )
}

export { VisitNumberCell }
