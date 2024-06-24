interface Patient {
  patientId: number
  patientIdExternal: string
}

interface Session {
  patientId?: number
  sessionToken: string
}

interface DrugHistory {
  drugName: string
  drugDuration: string
  epn: string
  line1: string
  quantity: number
  prescriptionId: number
  Prescription: {
    doctorName: string
    pharmacy: string
    refill: number
    fillDate: string
    prescriptionStatusTypeId: PrescriptionStatusTypeKey
    messageStatus: string | null
    PrescriptionScript: {
      drugFormat: string
    }
  }
  PrescriptionSigs: {
    line3: string
  }[]
}

const PrescriptionStatusType = {
  1: 'Active',
  2: 'Archived',
  3: 'Cancelled',
  4: 'Discontinued',
  5: 'Awaiting Approval',
  6: 'Current Medication',
} as const

type PrescriptionStatusTypeKey = keyof typeof PrescriptionStatusType

export {
  type Session,
  type Patient,
  type DrugHistory,
  type PrescriptionStatusTypeKey,
  PrescriptionStatusType,
}
