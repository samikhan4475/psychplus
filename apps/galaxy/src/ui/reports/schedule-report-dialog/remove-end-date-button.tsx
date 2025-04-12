'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ScheduleTemplateSchemaType } from './schedule-report-form'

const RemoveEndDateButton = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const endDate = form.watch('terminateOn')

  const handleClearEndDate = () => {
    form.resetField('terminateOn')
  }

  if (!endDate) return null

  return (
    <Button
      size="1"
      variant="ghost"
      className="text-pp-blue ml-1 w-[130px] cursor-pointer"
      onClick={handleClearEndDate}
    >
      Remove End Date
    </Button>
  )
}

export { RemoveEndDateButton }
