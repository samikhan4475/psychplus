'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const SocialSaveButton = () => {
  const form = useFormContext()
  const { isSubmitting } = form.formState
  const handleSave = () => {
    window.postMessage({
      type: 'quicknotes:save',
      widgetId: QuickNoteSectionName.QuickNoteSectionSocialHx,
      showToast: true,
    })
  }
  return (
    <Button onClick={handleSave} disabled={isSubmitting} size="1" highContrast>
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}
export { SocialSaveButton }
