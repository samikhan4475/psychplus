'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ClaimAuditHistoryFilterFormProps } from '../../types'
import { SchemaType } from '../insurance-payment-history-dialog/insurance-payment-history-filter-form'


const ClearButton = ({ onFilterSubmit }: ClaimAuditHistoryFilterFormProps) => {
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
