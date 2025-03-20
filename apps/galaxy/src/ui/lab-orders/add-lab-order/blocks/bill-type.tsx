import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'
import { useStore } from '@/ui/quicknotes/store'
import { LabOrderSchemaType } from '../lab-order-schema'

const BillType = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const labOrderId = form.watch('labOrderId')
  const labBillingType = form.watch('labBillingType')

  const patient = useStore((state) => state.patient)

  const insurancePolicies = patient?.insurancePolicies ?? []

  useEffect(() => {
    if (!labOrderId && !labBillingType) {
      const billingType =
        insurancePolicies?.length > 0 ? 'Insurance' : 'Patient'
      form.setValue('labBillingType', billingType)
    }
  }, [insurancePolicies, labOrderId, labBillingType])

  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Payment responsibility</BlockLabel>
      <CodesetSelect
        name="labBillingType"
        size="1"
        className="h-7 w-[180px]"
        codeset={CODESETS.LabBillingType}
        exclude={['Client']}
      />
      <FormFieldError name="labBillingType" />
    </Flex>
  )
}

export { BillType }
