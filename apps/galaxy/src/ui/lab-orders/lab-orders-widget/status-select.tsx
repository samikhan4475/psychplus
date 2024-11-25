'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const StatusSelect = () => {
  //TODO Need to add codesets once BE Api is done..

  const options = [
    { value: 'draft', label: 'Draft' },
    { value: 'result_received', label: 'Result Received' },
    { value: 'order_completed', label: 'Order Completed' },
    { value: 'submission_pending', label: 'Submission Pending' },
    { value: 'pre_order', label: 'Pre-order' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        options={options}
        field="status"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}
export { StatusSelect }
