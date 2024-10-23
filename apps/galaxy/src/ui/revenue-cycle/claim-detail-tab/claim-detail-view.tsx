import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AccidentAndLabView } from './accident-lab-section'
import { AuthAndReferralsView } from './auth-and-referrals-section'
import { BillingProviderView } from './billing-provider-section'
import { ChargesHeaderAction, ChargesTableView } from './charges-section'
import { ClaimAccordionItem } from './claim-accordion-item'
import {
  ClaimActions,
  ClaimDetailHeader,
  PatientClaimDetails,
} from './claim-header-section'
import {
  ClaimInsuranceHeaders,
  ClaimInsuranceTable,
} from './claim-insurances-section'
import { DiagnosisView } from './diagnosis-section'
import { claimUpdateSchema, ClaimUpdateSchemaType } from './schema'
import { SubmissionInformationView } from './submission-information-section'
import { SubmissionResponseTable } from './submission-response-section'

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
    defaultValues: {
      claimServiceLines: [],
      claimDiagnosis: [],
    },
  })
  const { control } = form

  const { append } = useFieldArray({
    control,
    name: 'claimServiceLines',
  })
  const onSubmit: SubmitHandler<ClaimUpdateSchemaType> = async () => {}

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value)
  }

  const onAddNewServiceLine = () => {
    const newServiceLine = {
      id: crypto.randomUUID(),
      recordStatus: 'Active',
      claimId,
      chargeId: '',
      cptCode: '',
      modifierCode1: '',
      modifierCode2: '',
      diagnosisPointer1: '',
      sequenceNo: form.watch('claimServiceLines').length + 1,
      dateOfServiceFrom: new Date(),
      dateOfServiceTo: new Date(),
      units: 0,
      unitAmount: 0.0,
      totalAmount: 0.0,
      placeOfService: '',
      isDoNotBill: false,
      statusCode: 'NewCharge',
      isAnesthesia: false,
    }

    append(newServiceLine)
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
          <ClaimAccordionItem title="Accidents And Labs">
            <AccidentAndLabView />
          </ClaimAccordionItem>
          <ClaimAccordionItem
            title="Insurances"
            buttons={ClaimInsuranceHeaders()}
          >
            <ClaimInsuranceTable />
          </ClaimAccordionItem>
          <ClaimAccordionItem title="Diagnosis">
            <DiagnosisView />
          </ClaimAccordionItem>
          <ClaimAccordionItem
            title="Charges"
            buttons={<ChargesHeaderAction onAddNew={onAddNewServiceLine} />}
          >
            <ChargesTableView />
          </ClaimAccordionItem>

          <Flex gap="3" className="flex-1">
            <ClaimAccordionItem
              title="Authorizations and Referrals"
              className="flex-1"
            >
              <AuthAndReferralsView />
            </ClaimAccordionItem>

            <ClaimAccordionItem
              title="Submission Information"
              className="flex-1"
            >
              <SubmissionInformationView />
            </ClaimAccordionItem>
          </Flex>
          <ClaimAccordionItem title="Submission Response">
            <SubmissionResponseTable />
          </ClaimAccordionItem>
        </Accordion.Root>
      </Flex>
    </FormContainer>
  )
}

export { ClaimDetailView }
