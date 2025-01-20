'use client'

import { WarningAlertDialog } from '@/ui/alerts'
import { useStore } from './store'

const AlertDialog = () => {
  const {
    setIsErrorAlertOpen,
    isErrorAlertOpen,
    setAlertErrorMessage,
    alertErrorMessage,
  } = useStore((state) => ({
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    isErrorAlertOpen: state.isErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
    alertErrorMessage: state.alertErrorMessage,
  }))

  return (
    <WarningAlertDialog
      isOpen={isErrorAlertOpen}
      setIsOpen={setIsErrorAlertOpen}
      message={alertErrorMessage}
      setMessage={setAlertErrorMessage}
    />
  )
}

export { AlertDialog }
