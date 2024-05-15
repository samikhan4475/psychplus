import { FeatureCard } from '@/components-v2'
import { Insurance } from '@/features/billing/payments/types'
import { InsurancePayer } from '../../types/insurance'
import { InsuranceForms } from './insurance-forms'

interface InsuranceCardProps {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
}

const InsuranceCard = ({
  insurancePayers,
  patientInsurances,
}: InsuranceCardProps) => {
  return (
    <FeatureCard title="Insurance" contentClassName="gap-3">
      <InsuranceForms
        patientInsurances={patientInsurances}
        insurancePayers={insurancePayers}
      />
    </FeatureCard>
  )
}

export { InsuranceCard }
