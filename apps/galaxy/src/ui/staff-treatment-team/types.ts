enum TreatmentTeamTab {
  Care_Teams = 'Care Teams',
  Primary_Provider = 'Primary Provider',
  Secondary_Provider = 'Secondary Provider',
  Visits = 'Visits',
}
interface VisitsList {
  dateTime: string
  patientName: string
  gender: string
  DOB: string
  MRN: string
  visitId: string
  location: string
  visitType: string
  visitStatus: string
}
interface VisitPayload {
  status?: string
}

export { TreatmentTeamTab }
export type { VisitsList, VisitPayload }
