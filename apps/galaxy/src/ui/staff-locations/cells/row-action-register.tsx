'use client'

import { Button, Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import ProviderRegisterDetailDialog from '../dialogs/provider-register-detail-dialog'
import { useRegisterDialog } from '../hooks/user-register-dialog'
import { StaffLocation } from '../types'

interface RowActionRegisterProps extends PropsWithRow<StaffLocation> {
  refreshData: () => void
  toggleRowClick?: () => void
  disabled?: boolean
  onClose?: () => void
}

const RowActionRegister = ({
  row: { original: record },
  refreshData,
  toggleRowClick,
  disabled,
  onClose,
}: RowActionRegisterProps) => {
  const { open, loading, providerData, handleOpen, handleClose } =
    useRegisterDialog(record)

  const handleDialogClose = () => {
    handleClose()
    if (onClose) onClose()
  }

  const handleApiSuccess = () => {
    handleClose()
    refreshData()
    if (onClose) onClose()
  }
  const buttonText = record.externalProviderId ? 'Update' : 'Register'

  return (
    <>
      <Button
        className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
        type="button"
        onClick={() => {
          if (toggleRowClick) toggleRowClick()
          handleOpen()
        }}
        disabled={disabled}
      >
        <Text className="text-pp-black-3 text-1">{buttonText}</Text>
      </Button>

      <ProviderRegisterDetailDialog
        open={open}
        onClose={handleDialogClose}
        data={record}
        providerData={providerData}
        loading={loading}
        onApiSuccess={handleApiSuccess}
      />
    </>
  )
}

export { RowActionRegister }
