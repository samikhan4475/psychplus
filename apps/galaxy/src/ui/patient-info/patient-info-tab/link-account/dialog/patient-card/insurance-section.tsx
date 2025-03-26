import { useEffect, useState } from 'react'
import { InsurancePolicy } from '@/ui/patient-banner/types'
import { getInsuranceInfoAction } from '../../actions'
import { LabelAndValue } from './label-and-value'

interface InsuranceInfoSectionProps {
  patientId: string
}

const PatientCardInsuranceSection = ({
  patientId,
}: InsuranceInfoSectionProps) => {
  const [insuranceResponse, setInsuranceResponse] =
    useState<InsurancePolicy[]>()

  const fetchPatientInsurancesData = async () => {
    const insurance = await getInsuranceInfoAction(patientId)
    if (insurance.state === 'success') {
      setInsuranceResponse(
        insurance.data[insurance.data.length - 1].insurancePolicies,
      )
    }
  }
  useEffect(() => {
    fetchPatientInsurancesData()
  }, [patientId])

  const [primaryPolicy, secondaryPolicy] = (insuranceResponse ?? []).filter(
    (policy) =>
      policy.insurancePolicyPriority === 'Primary' ||
      policy.insurancePolicyPriority === 'Secondary',
  )

  return (
    <>
      <LabelAndValue label="Primary Ins" value={primaryPolicy?.policyName} />
      <LabelAndValue
        label="Secondary Ins"
        value={secondaryPolicy?.policyName}
      />
    </>
  )
}

export { PatientCardInsuranceSection }
