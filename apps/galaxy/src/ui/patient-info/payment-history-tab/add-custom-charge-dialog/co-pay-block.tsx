'use client'

import { useEffect, useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { PaymentInput } from './shared'
import { toNumber } from './utils'

interface CoPayBlockProps {
  canEditPaidFields: boolean
}
const CoPayBlock = ({ canEditPaidFields }: CoPayBlockProps) => {
  const { setError, clearErrors } = useFormContext()
  const [coPayPaid, coInsPaid, balancePaid, unapplied] = useWatch({
    name: ['coPayPaid', 'coInsurancePaid', 'balancePaid', 'unappliedPayment'],
  })

  const prevValues = useRef({ coPayPaid, coInsPaid, balancePaid })

  useEffect(() => {
    const max = toNumber(unapplied)
    if (max <= 0) return

    const total = toNumber(coPayPaid) + toNumber(coInsPaid)
    toNumber(balancePaid)

    const changedField = (() => {
      if (prevValues.current.coPayPaid !== coPayPaid) return 'coPayDue'
      if (prevValues.current.coInsPaid !== coInsPaid) return 'coInsuranceDue'
      if (prevValues.current.balancePaid !== balancePaid) return 'balanceDue'
      return null
    })()

    clearErrors(['coPayDue', 'coInsuranceDue', 'balanceDue'])

    if (total > max && changedField) {
      setError(changedField, {
        type: 'manual',
        message: 'Paid amount exceeds unapplied balance',
      })
    }
    prevValues.current = { coPayPaid, coInsPaid, balancePaid }
  }, [coPayPaid, coInsPaid, balancePaid, unapplied])

  return (
    <Flex direction="column" className="rounded-2">
      <Flex
        gap="1"
        className="border-b-2 border-indigo-4 bg-indigo-3 px-1 py-0.5"
        align="center"
      >
        <Text size="1" weight="medium">
          Co-Pay
        </Text>
        <FormFieldError name="coPayDue" className="text-[10px] font-bold" />
      </Flex>
      <Flex gap="2" className="border-r-2 border-indigo-3 p-1">
        <PaymentInput label="Due PT" field="coPayDue" />
        <PaymentInput label="Due PP" field="coPayPreferredPartner" disabled />
        <PaymentInput
          label="Paid"
          field="coPayPaid"
          disabled={!canEditPaidFields}
        />
      </Flex>
    </Flex>
  )
}

export { CoPayBlock }
