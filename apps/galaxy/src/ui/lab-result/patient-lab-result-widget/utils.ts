import { LabResult } from '@/types'
import { LabResultResponse } from './types'

export type LabResultResponseUpdated = Omit<LabResultResponse, 'results'> & {
  subRows: LabResult[]
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

const getTableData = (labResultsResponse: LabResultResponse[]) => {
  let results: LabResult[] = []
  if (labResultsResponse?.length > 0)
    labResultsResponse?.forEach((labResultResponse) => {
      results = [
        ...results,
        ...labResultResponse.results.map((result) => ({
          ...result,
          testName: labResultResponse?.testName ?? '',
        })),
      ]
    })

  return results
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

export { updateResultsKey, removeEmptyValues, getTableData }
