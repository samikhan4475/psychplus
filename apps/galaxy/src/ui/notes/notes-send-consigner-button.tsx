import { Button } from '@radix-ui/themes'
import { SignIcon, UserIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { CosignDialog } from './cosign-dialog'
import { useCosignDialog } from './hooks'
import { useStore } from './store'

const NotesSendCosignerButton = () => {
  const { isOpen, closeDialog, openDialog } = useCosignDialog()
  const { setErrorMessage, setIsErrorAlertOpen, selectedRow, isInboxNotes } =
    useStore((state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      selectedRow: state.selectedRow,
      isInboxNotes: state.isInboxNotes,
    }))

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

  const title = isInboxNotes ? 'Change Cosigner' : 'Send to Cosigner'

  return (
    <>
      {isInboxNotes ? (
        <Button
          variant="ghost"
          color="gray"
          size="1"
          className="text-black pl-0"
          onClick={handleClick}
        >
          <UserIcon width={16} height={16} />
          {`${title}`}
        </Button>
      ) : (
        <Button size="1" highContrast onClick={handleClick}>
          <SignIcon width={16} height={16} />
          {title}
        </Button>
      )}

      {isOpen && (
        <CosignDialog isOpen={isOpen} closeDialog={closeDialog} title={title} />
      )}
    </>
  )
}

export { NotesSendCosignerButton }
