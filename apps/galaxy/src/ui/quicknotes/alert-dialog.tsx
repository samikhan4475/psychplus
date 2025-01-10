'use client'

import { WarningAlertDialog } from '../alerts'
import { useStore } from './quicknotes-store'

const AlertDialog = () => {
  const {
    setIsErrorAlertOpen,
    isErrorAlertOpen,
    setErrorMessage,
    errorMessage,
  } = useStore((state) => ({
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    isErrorAlertOpen: state.isErrorAlertOpen,
    setErrorMessage: state.setErrorMessage,
    errorMessage: state.errorMessage,
  }))

  return (
    <WarningAlertDialog
      isOpen={isErrorAlertOpen}
      setIsOpen={setIsErrorAlertOpen}
      message={errorMessage}
      setMessage={setErrorMessage}
    />
  )
}

export { AlertDialog }
