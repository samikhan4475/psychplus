'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const SubstanceUseSaveButton = () => {
  const handleSave = () => {
    window.postMessage({
      type: 'quicknotes:save',
      widgetId: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
      showToast: true,
    })
  }
  return (
    <Button onClick={handleSave} size="1" highContrast>
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { SubstanceUseSaveButton }
