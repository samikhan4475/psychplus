'use client'

import { useSearchParams } from 'next/navigation'
import { getPracticeIdsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PracticeNameSelect = () => {
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Practice Name</FormFieldLabel>
      <AsyncSelect
        field="practiceId"
        buttonClassName="w-full  text-1"
        required
        fetchOptions={getPracticeIdsAction}
        disabled={!!practiceId}
      />
    </FormFieldContainer>
  )
}

export { PracticeNameSelect }
