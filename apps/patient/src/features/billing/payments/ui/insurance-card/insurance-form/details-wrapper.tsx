import * as Accordion from '@radix-ui/react-accordion'
import { UseFormReturn } from 'react-hook-form'
import { PaymentMethodsAccordionItem } from '@/components-v2'
import InsuranceDetails from '@/features/call/blocks/insurance-details'
import { InsurancePayer } from '../../../types'
import { InsuranceSchemaType } from '../schema'

interface InsuranceDetailsWrapperProps {
  insurancePayers: InsurancePayer[]
  isReadOnly: boolean
  isCall: boolean
  form: UseFormReturn<InsuranceSchemaType>
  watchisPatientPolicyHolder: boolean
  onCheckedChange: (isPolicyHolder: boolean) => void
}

const InsuranceDetailsWrapper = ({
  insurancePayers,
  isReadOnly,
  isCall,
  form,
  watchisPatientPolicyHolder,
  onCheckedChange,
}: InsuranceDetailsWrapperProps) => {
  if (isCall) {
    return (
      <Accordion.Root type="single" className="w-full">
        <PaymentMethodsAccordionItem
          triggerClassName="bg-[#F9F9FB]"
          title="Insurance Details"
          content={
            <InsuranceDetails
              insurancePayers={insurancePayers}
              isReadOnly={isReadOnly}
              watchisPatientPolicyHolder={watchisPatientPolicyHolder}
              form={form}
              onCheckedChange={onCheckedChange}
            />
          }
        />
      </Accordion.Root>
    )
  }

  return (
    <InsuranceDetails
      insurancePayers={insurancePayers}
      isReadOnly={isReadOnly}
      watchisPatientPolicyHolder={watchisPatientPolicyHolder}
      onCheckedChange={onCheckedChange}
      form={form}
    />
  )
}

export default InsuranceDetailsWrapper
