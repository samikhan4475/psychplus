'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from '../../store'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const SupervisedByField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'supervisorStaffId')
  const { providerOptions, loadingProviderOptions } = useStore((state) => ({
    providerOptions: state.providerOptions,
    loadingProviderOptions: state.loadingProviderOptions,
  }))
  const mergedOptions = [{ label: 'None', value: 'none' }, ...providerOptions]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Supervising provider</FormFieldLabel>
      <SelectInput
        field={field}
        placeholder="Select"
        options={mergedOptions}
        loading={loadingProviderOptions}
        buttonClassName="w-full h-7"
        className="w-full"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { SupervisedByField }
