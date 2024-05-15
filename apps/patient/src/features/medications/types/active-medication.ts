type PrescriptionMessageStatus = 'Success' | 'Pending' | 'Error'

interface ActiveMedication {
  id: string
  name: string
  epn: string
  directions: string
  supply: number
  refills: number
  ends: string
  provider: string
  pharmacy: string
  status: PrescriptionMessageStatus
}

export type { ActiveMedication, PrescriptionMessageStatus }
