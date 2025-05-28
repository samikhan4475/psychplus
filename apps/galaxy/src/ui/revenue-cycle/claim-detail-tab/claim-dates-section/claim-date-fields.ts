import { ClaimUpdateSchemaType } from '../schema'

export const claimDateFields: {
  label: string
  field: keyof ClaimUpdateSchemaType
  type: 'date' | 'text'
}[] = [
  { label: 'Last Seen Date', field: 'lastSeenDate', type: 'date' },
  {
    label: 'Onset Date of Current illness',
    field: 'onsetOfCurrentIllness',
    type: 'date',
  },
  {
    label: 'First Date of Similar illness',
    field: 'firstSimilarIllness',
    type: 'date',
  },
  { label: 'Date of Pregnancy', field: 'lastMenstrualPeriod', type: 'date' },
  { label: 'Admission Date', field: 'admissionDate', type: 'date' },
  { label: 'Discharge Date', field: 'dischargeDate', type: 'date' },
  { label: 'Last X-Ray Date', field: 'lastXRayDate', type: 'date' },
  { label: 'Last X-Ray Type', field: 'lastXRayType', type: 'text' },
  {
    label: 'Unable to Work from Date',
    field: 'startDateOfInabilityToWork',
    type: 'date',
  },
  {
    label: 'Unable to Work to Date',
    field: 'endDateOfInabilityToWork',
    type: 'date',
  },
  {
    label: 'Payer Claim Control #',
    field: 'payerClaimControlNumber',
    type: 'text',
  },
]
