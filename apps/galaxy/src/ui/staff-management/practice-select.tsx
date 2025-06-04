import React, { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getPracticeOptionsAction } from './actions'
import { FEATURE_TYPES } from './constants'

const PracticeSelect = () => {
  const { type, id } = useParams<{ type: string; id: string }>()
  let payload: { practiceId?: string; organizationId?: string } = {}

  if (type === FEATURE_TYPES.PRACTICE) {
    payload = { practiceId: id }
  } else if (type === FEATURE_TYPES.ORGANIZATION) {
    payload = { organizationId: id }
  }

  const fetchOptions = useCallback(() => {
    if (!id) return Promise.resolve({ state: 'success' as const, data: [] })
    return getPracticeOptionsAction({ payload })
  }, [id, type])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Practice</FormFieldLabel>
      <AsyncSelect
        disabled={type === FEATURE_TYPES.PRACTICE}
        fetchOptions={fetchOptions}
        field="practicesIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Select"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
