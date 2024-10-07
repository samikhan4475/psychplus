'use client'

import { getSlashedPaddedDateString } from '@/utils'
import { LabeledContent } from '../../shared'
import { InsuranceImages } from './insurance-images'
import { PatientDetails } from './patient-details'
import { useStore } from './store'

interface DetailSectionProps {
  patientId: string
  policyId: string
}
const DetailSection = ({ patientId, policyId }: DetailSectionProps) => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  return (
    <>
      <LabeledContent
        title="Priority"
        content={selectedRow?.insurancePolicyPriority}
        required
      />
      <LabeledContent title="Payer" content={selectedRow?.payerName} required />
      <LabeledContent
        title="Insurance Plan"
        content={selectedRow?.policyName}
        required
      />
      <LabeledContent
        title="Member ID"
        content={selectedRow?.memberId}
        required
      />
      <LabeledContent
        title="Group Number"
        content={selectedRow?.groupNumber}
        required
      />
      <LabeledContent
        title="Effective Date"
        content={getSlashedPaddedDateString(selectedRow?.effectiveDate)}
        required
      />
      <LabeledContent
        title="Termination Date"
        content={getSlashedPaddedDateString(selectedRow?.terminationDate)}
        required
      />
      <LabeledContent
        title="Patient is insurance holder"
        className="col-span-2"
        content={selectedRow?.isPatientPolicyHolder ? 'Yes' : 'No'}
      />
      {!selectedRow?.isPatientPolicyHolder && <PatientDetails />}
      <InsuranceImages patientId={patientId} policyId={policyId} />
    </>
  )
}

export { DetailSection }
