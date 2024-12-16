import { LabResultResponse, LabResults } from './types'

export type LabResultResponseUpdated = Omit<LabResultResponse, 'results'> & {
  subRows: LabResults[]
}

const updateResultsKey = (
  labResults: LabResultResponse[],
): LabResultResponseUpdated[] => {
  return labResults.map((result) => ({
    ...result,
    subRows: result.results,
    results: undefined,
  }))
}

interface FormattedData {
  dateFrom: string | null
  dateTo: string | null
  patientId: string
  resourceStatusList: string[]
  labTestName: string
}

const removeEmptyValues = (obj: FormattedData) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== ''),
  )
}

export { updateResultsKey, removeEmptyValues }
