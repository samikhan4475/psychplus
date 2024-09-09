import { Button } from '@radix-ui/themes'
import { SignIcon } from '@/components/icons'
import { CosignDialog } from '../cosign-dialog'
import { useCosignDialog } from '../hooks'
import { useStore } from '../store'

const SignButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()
  const { selectedRow, setErrorMessage, setIsErrorAlertOpen } = useStore(
    (state) => ({
      selectedRow: state.selectedRow,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    }),
  )
  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select note to click this button')
      return
    }
    openDialog()
  }

  return (
    <>
      <Button size="1" highContrast onClick={handleClick}>
        <SignIcon width={16} height={16} />
        Send to Sign
      </Button>

      <CosignDialog isOpen={isOpen} closeDialog={closeDialog} />
    </>
  )
}

export { SignButton }
