'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PayerAuditHistoryFilterFormProps } from '@/ui/payer/types'
import { SchemaType } from './payer-history-filter-form'

const ClearButton = ({ onFilterSubmit }: PayerAuditHistoryFilterFormProps) => {
  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    onFilterSubmit()
  }

  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
