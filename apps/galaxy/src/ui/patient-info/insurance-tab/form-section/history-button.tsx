'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { Insurance } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { InsurancePermissionMessages } from '../constants'
import { HistoryDetailsDialog } from '../dialogs'
import { useInsurancePermissions } from '../hooks/use-insurance-permissions'

interface HistoryButtonProps {
  disabled?: boolean
  patientId: string
  policyId: string
  insurance?: Insurance
}

const HistoryButton = ({
  disabled,
  patientId,
  policyId,
  insurance,
}: HistoryButtonProps) => {
  const { canViewHistoryInsurancePage } = useInsurancePermissions()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const onOpen = () => {
    if (!canViewHistoryInsurancePage) {
      setIsOpen(true)
      return
    }

    setOpen(true)
  }
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        size="1"
        variant={open ? 'solid' : 'outline'}
        color={open ? 'blue' : 'gray'}
        className={cn('text-black', { 'text-white bg-pp-blue': open })}
        type="button"
        onClick={onOpen}
        disabled={disabled}
      >
        <HistoryIcon size={14} /> History
      </Button>
      <HistoryDetailsDialog
        open={open}
        onClose={onClose}
        patientId={patientId}
        policyId={policyId}
        title={insurance?.policyName ?? ''}
      />
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={InsurancePermissionMessages.checkInsuranceHistory}
      />
    </>
  )
}

export default HistoryButton
