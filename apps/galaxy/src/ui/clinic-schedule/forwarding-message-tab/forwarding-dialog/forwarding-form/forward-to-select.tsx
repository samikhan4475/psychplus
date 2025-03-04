'use client'

import { useMemo } from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectChipDropdown,
} from '@/components'
import { useStore } from '../../store'

const ForwardToSelect = () => {
  const { options, loading } = useStore((state) => ({
    options: state.staffOptions,
    loading: state.staffLoading,
  }))
  const formattedOptions = useMemo(
    () => options?.map(({ label, value }) => ({ display: label, value })) || [],
    [options],
  )
  return (
    <FormFieldContainer className="col-span-5">
      <FormFieldLabel>Forward To</FormFieldLabel>
      <MultiSelectChipDropdown
        name="messageForwardingRecipients"
        className="h-6 flex-1"
        options={formattedOptions}
        disabled={loading}
        showOptionsAtBottom
        shouldTrigger
      />
      <FormFieldError name="messageForwardingRecipients" />
    </FormFieldContainer>
  )
}

export { ForwardToSelect }
