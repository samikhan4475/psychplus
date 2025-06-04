'use client'

import { Button } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { usePreferredPartnerStore } from '../store'
import { getInitialValues } from '../utils'
import { PreferredPartnerFiltersSchemaType } from './schema'

interface ClearButtonProps {
  ppid: string
  form: ReturnType<typeof useForm<PreferredPartnerFiltersSchemaType>>
}

const ClearButton = ({ ppid, form }: ClearButtonProps) => {
  const { searchWorklist } = usePreferredPartnerStore((state) => ({
    searchWorklist: state.searchWorklist,
  }))

  const handleResetForm = () => {
    searchWorklist(ppid, getInitialValues(), 1, true)
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
