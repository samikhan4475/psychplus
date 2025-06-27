'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError } from '@/components'
import { PaymentInput } from './shared'

interface CoInsBlockProps {
  canEditPaidFields: boolean
}

const CoInsBlock = ({canEditPaidFields}:CoInsBlockProps) => {
  return (
    <Flex direction="column" className="rounded-2">
      <Flex
        gap="1"
        className="border-b-2 border-indigo-4 bg-indigo-3 px-1 py-0.5"
        align="center"
      >
        <Text size="1" weight="medium">
          Co-Ins
        </Text>
        <FormFieldError
          name="coInsuranceDue"
          className="text-[10px] font-bold"
        />
      </Flex>
      <Flex gap="2" className="border-r-2 border-indigo-3 p-1">
        <PaymentInput label="Due PT" field="coInsuranceDue" />
        <PaymentInput
          label="Due PP"
          field="coInsurancePreferredPartner"
          disabled
        />
        <PaymentInput label="Paid" field="coInsurancePaid" disabled={!canEditPaidFields} />
      </Flex>
    </Flex>
  )
}

export { CoInsBlock }
