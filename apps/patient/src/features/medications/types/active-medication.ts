type PrescriptionMessageStatus =
  | 'Active'
  | 'Archived'
  | 'Cancelled'
  | 'Discontinued'
  | 'Awaiting Approval'
  | 'Current Medication'

interface ActiveMedication {
  id: string
  name: string
  epn: string
  dose: string
  form: string
  indication: string
  quantity: number
  refills: number
  ends: string
  starts: string
  provider: string
  pharmacy: string
  status: PrescriptionMessageStatus
}

export type { ActiveMedication, PrescriptionMessageStatus }
