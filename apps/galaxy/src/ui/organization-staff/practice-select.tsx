'use client'

import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getPracticeOptionsAction } from './actions'
import { FEATURE_TYPES } from './constants'

const PracticeSelect = () => {
  const { type, id } = useParams<{ type: string; id: string }>()
  const payload =
    type === FEATURE_TYPES.PRACTICE
      ? { practiceId: id }
      : { organizationId: id }

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <AsyncSelect
        field="practicesIds.[0]"
        fetchOptions={() => getPracticeOptionsAction({ payload })}
        className="w-full"
        disabled={type === FEATURE_TYPES.PRACTICE}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
