'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionItem } from '@/types'

interface PsychiatryAssessmentPlanSaveButtonSaveButtonProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const PsychiatryAssessmentPlanSaveButton = ({
  patientId,
  getData,
}: PsychiatryAssessmentPlanSaveButtonSaveButtonProps) => {
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
      size="1"
      highContrast
      type="button"
      onClick={onSubmit}
      disabled={isSubmitting}
    >
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { PsychiatryAssessmentPlanSaveButton }
