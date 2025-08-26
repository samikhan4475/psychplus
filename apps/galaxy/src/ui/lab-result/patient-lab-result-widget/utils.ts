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
  labTestName?: string
  labTestNamePartial: string
}

const removeEmptyValues = (obj: FormattedData) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== ''),
  )
}

const getGroupedTestData = (labResults: LabResultResponse[] = []) => {
  return labResults.map((entry) => ({
    testName: entry.testName ?? '',
    subRows: entry.results.map((res) => ({
      ...res,
      testName: entry.testName ?? '',
    })),
  }))
}

const getTextColorClass = (code: string | undefined) => {
  if (!code || code.trim() === '' || code === 'N') return ''
  return 'text-red-9'
}

export { updateResultsKey, removeEmptyValues, getTableData, getGroupedTestData, getTextColorClass }
