'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useJournalActions } from '../hooks'
import { useStore } from '../store'
import { convertExistingAttachments } from '../utils'

interface ActionButtonsProps {
  setIsEditing?: (value: boolean) => void
}

const ActionButtons = ({ setIsEditing }: ActionButtonsProps) => {

  const { currentJournalId, formData, journalEntries, setFormData } = useStore((state) => ({
    currentJournalId: state.currentJournalId,
    formData: state.formData,
    journalEntries: state.journalEntries,
    setFormData: state.setFormData
  }))
  const canSave = !!formData.title.trim() && !!formData.content.trim()

  const handleCancel = () => {
    if (journalEntries.length > 0) {
      setFormData({
        title: journalEntries[0].title,
        content: journalEntries[0].notes,
        attachments: convertExistingAttachments(journalEntries[0].attachments || []),
      })
    } else {
      setFormData({
        title: '',
        content: '',
        attachments: [],
      })
    }
    setIsEditing?.(false)
  }

  const {
    createJournal,
    updateJournal,
    uploadAttachments,
    isCreating,
    isUpdating,
    isUploading,
  } = useJournalActions()

  const isSaving = isCreating || isUpdating || isUploading

  const getSaveLabel = (isSaving: boolean, isUpdate: boolean) => {
    if (isSaving) {
      return isUpdate ? 'Updating...' : 'Saving...'
    }
    return isUpdate ? 'Update' : 'Save'
  }

  const handleSave = async () => {
    const action = currentJournalId ? updateJournal : createJournal

    const journalId = await action(formData)

    if (formData.attachments.length > 0 && journalId) {
      await uploadAttachments(journalId, formData.attachments)
    }

    setIsEditing?.(false)
  }

  const isUpdate = Boolean(currentJournalId)
  const saveLabel = getSaveLabel(isSaving, isUpdate)

  return (
    <Flex className="mx-5 my-3" gap="2" justify="end">
      <Button
        variant="outline"
        highContrast
        color="gray"
        className="w-28"
        onClick={handleCancel}
        disabled={isSaving}
      >
        Cancel
      </Button>
      <Button
        highContrast
        className="w-28"
        onClick={handleSave}
        disabled={isSaving || !canSave}
      >
        {saveLabel}
      </Button>
    </Flex>
  )
}

export default ActionButtons 