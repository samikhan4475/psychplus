import { Button } from '@radix-ui/themes'
import { SignIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { CosignDialog } from './cosign-dialog'
import { useCosignDialog } from './hooks'
import { useStore } from './store'

const NotesSendCosignerButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()
  const { setErrorMessage, setIsErrorAlertOpen, selectedRow } = useStore(
    (state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      selectedRow: state.selectedRow,
    }),
  )

  const sentToCosignerButtonPermission = useHasPermission(
    'sendToCosignerButtonNotesPage',
  )
  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select one note to click this button')
      return
    }

    if (!sentToCosignerButtonPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Send Note to Cosigner. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    openDialog()
  }

  return (
    <>
      <Button size="1" highContrast onClick={handleClick}>
        <SignIcon width={16} height={16} />
        Send to Cosigner
      </Button>

      {isOpen && <CosignDialog isOpen={isOpen} closeDialog={closeDialog} />}
    </>
  )
}

export { NotesSendCosignerButton }
