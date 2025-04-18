'use client'

import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getPracticeOptionsAction } from './actions'
import { FEATURE_TYPES } from './constants'

const PracticeSelect = () => {
  const { type } = useParams<{ type: string }>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <AsyncSelect
        field="practicesIds.[0]"
        fetchOptions={getPracticeOptionsAction}
        className="w-full"
        disabled={type === FEATURE_TYPES.PRACTICE}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
