import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as TabStore } from '../../store'
import { ClaimProcessedSelect } from './claim-processed-select'
import { ClaimStatusSelect } from './claim-status-select'
import { ClaimSummaryCard } from './claim-summary-card'

const schema = z.object({
  claimStatus: z.string().optional(),
  processedCode: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const InsurancePaymentClaimSummary = () => {
  const activeTab = TabStore((state) => state.activeTab)
  const Claim = useStore((state) => state.paymentPostingClaim[activeTab])
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      claimStatus: '',
      processedCode: '',
    },
  })

  const onSubmit = () => {
    // TODO: need api implementation
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gapX="8" align="center" width="100%">
        <Flex direction="column">
          <Flex mb="2" justify="between" align="center">
            <Text mb="1" size="3" weight="bold">
              Claim Summary
            </Text>
            <ClaimStatusSelect />
          </Flex>
          <Flex gapX="3">
            <ClaimSummaryCard label="Claim Total" value={Claim?.totalAmount} />
            <ClaimSummaryCard label="Claim Balance" value={Claim?.amountDue} />
            <ClaimSummaryCard label="Primary Paid" value={Claim?.primaryPaid} />
            <ClaimSummaryCard
              label="Secondary Paid"
              value={Claim?.secondaryPaid}
            />
            <ClaimSummaryCard
              label="Tertiary Paid"
              value={Claim?.tertiaryPaid}
            />
            <ClaimSummaryCard label="Patient Paid" value={Claim?.patientPaid} />
          </Flex>
        </Flex>
        <ClaimProcessedSelect />
      </Flex>
    </FormContainer>
  )
}

export { InsurancePaymentClaimSummary }
