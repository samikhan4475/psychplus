import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { BillingProviderView } from './billing-provider/billing-provider-view'
import { ClaimAccordionItem } from './claim-accordion-item'
import { ClaimActions } from './claim-header/claim-header-actions'
import { ClaimDetailHeader } from './claim-header/claim-header-details'
import { PatientClaimDetails } from './claim-header/claim-patient-details'
import { ClaimInsuranceHeaders } from './claim-insurances/claim-insurance-header-actions'
import { ClaimInsuranceTable } from './claim-insurances/claim-insurance-table'
import { claimUpdateSchema, ClaimUpdateSchemaType } from './schema'

interface ClaimDetailViewProps {
  claimId: string
}
const ClaimDetailView = ({ claimId }: ClaimDetailViewProps) => {
  const [openItems, setOpenItems] = useState<string[]>([
    'Billing Provider',
    'Accidents And Labs',
    'Diagnosis',
    'Charges',
    'Authorizations and Referrals',
    'Submission Information',
    'Submission Response',
    'Insurances',
  ])

  const form = useForm<ClaimUpdateSchemaType>({
    resolver: zodResolver(claimUpdateSchema),
    reValidateMode: 'onChange',
    defaultValues: {},
  })
  const onSubmit: SubmitHandler<ClaimUpdateSchemaType> = async (data) => {}

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-pp-bg-accent ">
      <ClaimDetailHeader claimId={claimId} />
      <ClaimActions />
      <PatientClaimDetails />
      <Flex direction="column" className="bg-white overflow-hidden rounded-1">
        <Accordion.Root
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={handleAccordionChange}
        >
          <ClaimAccordionItem title="Billing Provider">
            <BillingProviderView />
          </ClaimAccordionItem>
          <ClaimAccordionItem
            title="Insurances"
            buttons={ClaimInsuranceHeaders()}
          >
            <ClaimInsuranceTable />
          </ClaimAccordionItem>
        </Accordion.Root>
      </Flex>
    </FormContainer>
  )
}

export { ClaimDetailView }
