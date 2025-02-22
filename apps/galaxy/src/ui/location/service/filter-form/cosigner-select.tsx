'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { ActionResult, SelectOptionType } from '@/types'
import { transformInOptions } from '../transform'

const CosignerSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Co-Signer</FormFieldLabel>
      <AsyncSelect
        fetchOptions={fetchOptions}
        size="1"
        field="coSigner"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}
const fetchOptions = async (): Promise<ActionResult<SelectOptionType[]>> => {
  const response = await getProvidersOptionsAction()
  if (response.state === 'error') {
    return {
      error: response.error,
      state: 'error',
    }
  }
  return {
    data: transformInOptions(response.data),
    state: 'success',
  }
}
export { CosignerSelect }
