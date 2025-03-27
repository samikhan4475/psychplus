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
  return canSave ? (
    <Button
      loading={form.formState.isSubmitting}
      className="ml-auto"
      type="submit"
      size="1"
      highContrast
    >
      <SaveIcon width="16" className="mr-1" /> Save
    </Button>
  ) : (
    <Button
      className="ml-auto"
      type="button"
      size="1"
      highContrast
      onClick={() => {
        showPermissionAlert(true, SAVE_ALERT)
      }}
    >
      <SaveIcon width="16" className="mr-1" /> Save
    </Button>
  )
}

export { SavePreferencesButton }
