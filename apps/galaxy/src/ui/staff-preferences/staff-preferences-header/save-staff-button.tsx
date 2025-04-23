import React from 'react'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useHasPermission } from '@/hooks'
import { SAVE_ALERT } from '../constant'

const SavePreferencesButton = ({
  showPermissionAlert,
}: {
  showPermissionAlert: (isOpen: boolean, message: string) => void
}) => {
  const form = useFormContext()
  const canSave = useHasPermission('clickSaveMangStaffPrefAdminViewNonAdmin')
  const handleSaveClick = () => {
    if (!canSave) showPermissionAlert(true, SAVE_ALERT)
  }
  return (
    <Button
      className="ml-auto"
      highContrast
      size="1"
      loading={form.formState.isSubmitting}
      disabled={form.formState.isSubmitting}
      type={canSave ? 'submit' : 'button'}
      onClick={handleSaveClick}
    >
      <SaveIcon width="16" className="mr-1" /> Save
    </Button>
  )
}

export { SavePreferencesButton }
