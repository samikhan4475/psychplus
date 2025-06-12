'use client'

import { Button } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { getInitialValues } from '../utils'
import { PreferredPartnerFiltersSchemaType } from './schema'

interface ClearButtonProps {
  ppid: string
  form: ReturnType<typeof useForm<PreferredPartnerFiltersSchemaType>>
  onClear: (ppid: string) => void
}

const ClearButton = ({ ppid, form, onClear }: ClearButtonProps) => {
  const handleResetForm = () => {
    onClear(ppid)
    form.reset({ ...getInitialValues() })
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black disabled:text-gray-5"
      onClick={handleResetForm}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
