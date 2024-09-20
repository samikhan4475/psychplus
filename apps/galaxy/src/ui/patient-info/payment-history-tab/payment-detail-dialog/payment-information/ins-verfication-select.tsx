'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CheckEligibilityButton } from './check-eligibility-button'

const InsVerificationSelect = () => {
  return (
    <Flex gap="2" align="end">
      <FormFieldContainer className="w-auto">
        <FormFieldLabel className="!text-1 !font-medium">
          Ins. Verification
        </FormFieldLabel>
        <SelectInput
          size="1"
          placeholder="Select Type"
          field="verification"
          buttonClassName="border-pp-gray-2 w-[100.44px] h-6 border border-solid !outline-none [box-shadow:none]"
        />
      </FormFieldContainer>
      <CheckEligibilityButton />
    </Flex>
  )
}

export { InsVerificationSelect }
