type AllergyStatus = 'active' | 'inactive'

interface AllergyDataResponse {
  scriptSureAllergyId: number
  patientId: number
  scriptSurePatientId: number
  allergyName: string
  encounterId: number
  rxNormCode: string
  nationalDrugCode: string
  allergyType: string
  reaction: string
  severityCode: string
  adverseEventCode: string
  onsetBegan: string
  onsetEnded: string
  archive: number | string
  severity?: string
  comment?: string
  status: AllergyStatus
}

export type { AllergyDataResponse }
