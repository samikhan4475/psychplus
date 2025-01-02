import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import InsuranceFormView from './blocks/insurance-form-view'
import InsuranceListView from './blocks/insurance-list-view'

const AddInsurance = ({
  insurancePayers,
  patientInsurances,
}: {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
}) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([])
  const [insurance, setInsurance] = useState<Insurance | undefined>(undefined)

  const handleAccordionToggle = (value: string) => {
    setOpenAccordions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const handleCancel = () => {
    setOpenAccordions((prev) => prev.filter((v) => v !== 'add-insurance'));
  };

  return (
    <Accordion.Root type="multiple" value={openAccordions}>
      <InsuranceListView
        patientInsurance={patientInsurances}
        onAddInsuranceClick={handleAccordionToggle}
        setInsurance={setInsurance}
      />
      <InsuranceFormView
        insurancePayers={insurancePayers}
        onAddInsuranceClick={handleAccordionToggle}
        insurance={insurance}
        setInsurance={setInsurance}
        onCancel={handleCancel}
      />
    </Accordion.Root>
  )
}

export { AddInsurance }
