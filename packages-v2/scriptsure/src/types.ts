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
    prescriptionStatusTypeId: number
    messageStatus: string | null
    PrescriptionScript: {
      drugFormat: string
    }
  }
  PrescriptionSigs: {
    line3: string
  }[]
}

export type { Session, Patient, DrugHistory }
