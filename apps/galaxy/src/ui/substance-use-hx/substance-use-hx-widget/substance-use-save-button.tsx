'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionItem } from '@/types'

interface SubstanceUseSaveButtonProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}
const SubstanceUseSaveButton = ({
  patientId,
  getData,
}: SubstanceUseSaveButtonProps) => {
  const form = useFormContext()
  const { isSubmitting } = form.formState

  const onSubmit = form.handleSubmit(async (data) => {
    const payload = { patientId, data: getData(data) }
    const result = await saveWidgetAction(payload)
    if (result.state === 'error') {
      toast.error('Failed to save!')
      return
    }
    form.reset(data)
    toast.success('Saved!')
  })
  return (
    <Button
      onClick={onSubmit}
      disabled={isSubmitting}
      type="submit"
      size="1"
      highContrast
    >
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { SubstanceUseSaveButton }
