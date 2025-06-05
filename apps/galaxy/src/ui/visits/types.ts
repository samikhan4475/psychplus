enum VisitsTab {
  Dashboard = 'Dashboard',
}

enum RecordStatuses {
  ACTIVE = 'Active',
}

interface GetAllVisitsListResponse {
  allVisits: AllVisits[]
  total: number
}

interface StateVisitsListResponse {
  StateVisits: StateVisits[]
  total: number
}

interface AllVisits {
  visitType: string
  visitSequence: string
  totalVisits: number
  activeVisits: number
  checkedOutVisits: number
}

interface StateVisits {
  stateName: string
  stateCode: string
  total: VisitBreakdown
  public: VisitBreakdown
  active: VisitBreakdown
  checkedOut: VisitBreakdown
}

interface VisitBreakdown {
  psychiatryNew: number
  psychiatryEst: number
  therapy: number
}

interface AllVisitsParams {
  isIncludeMetadataResourceChangeControl: boolean
  isIncludeMetadataResourceIds: boolean
  isIncludeMetadataResourceStatus: boolean
  dateFrom: string
  dateTo: string
  stateCodes: string[]
}

interface StateVisitsParams {
  isIncludeMetadataResourceChangeControl: true
  isIncludeMetadataResourceIds: true
  isIncludeMetadataResourceStatus: true
  dateFrom: string
  dateTo: string
  stateCodes: string[]
}

export {
  VisitsTab,
  RecordStatuses,
  type GetAllVisitsListResponse,
  type AllVisitsParams,
  type AllVisits,
  type StateVisitsListResponse,
  type StateVisits,
  type StateVisitsParams,
}
