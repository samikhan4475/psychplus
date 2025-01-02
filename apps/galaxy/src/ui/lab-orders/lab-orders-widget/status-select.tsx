'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const StatusSelect = () => {
  //TODO Need to add codesets once BE Api is done..

  const options = [
    { value: 'draft', label: 'Draft' },
    { value: 'resultReceived', label: 'Result Received' },
    { value: 'orderCompleted', label: 'Order Completed' },
    { value: 'submissionPending', label: 'Submission Pending' },
    { value: 'preOrder', label: 'Pre-order' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        options={options}
        field="orderStatus"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}
export { StatusSelect }
