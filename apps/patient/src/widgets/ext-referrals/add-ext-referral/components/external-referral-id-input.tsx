'use client'

import { FormField, NumberInput } from '@/components-v2'

const ExternalReferralIdInput = () => {
  return (
    <FormField
      containerClassName="flex-1"
      name="externalReferenceId"
      label="Order Number"
    >
      <NumberInput
        format="########"
        field="externalReferenceId"
        placeholder="Order Number"
        className="border-pp-gray-2 h-[38px] w-full rounded-6 border px-2 py-1 focus:border-blue-8 focus:outline-none focus:ring-1 focus:ring-blue-8"
      />
    </FormField>
  )
}

export { ExternalReferralIdInput }
