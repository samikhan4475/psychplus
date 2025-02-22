'use client'

import { getPOSCodesOptions } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { ActionResult, SelectOptionType } from '@/types'
import { transformInOptions } from '../transform'

const PosInput = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>POS</FormFieldLabel>
      <AsyncSelect
        field="pos"
        placeholder="Select"
        fetchOptions={fetchOptions}
        size="1"
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}
const fetchOptions = async (): Promise<ActionResult<SelectOptionType[]>> => {
  const response = await getPOSCodesOptions()
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
export { PosInput }
