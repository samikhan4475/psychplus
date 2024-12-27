import { DateValue } from 'react-aria-components'
import { LabResult, LabResultPayload } from '@/types'
import { formatDateToISOString, getCalendarDate } from '@/utils'
import { SchemaType } from './schema'

const transformInDefault = (
  labTestId: string,
  labResults: LabResult[],
): Partial<SchemaType> => {
  const labTestData =
    labResults && labResults?.length > 0
      ? labResults
          .filter((labResult) => labResult.labTestId === labTestId)
          .map((labresult) => {
            return {
              id: labresult.id,
              orderId: labresult.orderId,
              observationTime: getCalendarDate(
                (labresult?.observationTime as string) ?? '',
              ),
              resultName: labresult?.resultName ?? '',
              recordStatus: labresult?.recordStatus ?? '',
              resultCode: labresult?.resultCode ?? '',
              resultValue: labresult?.resultValue ?? '',
              resultValueUnit: labresult?.resultValueUnit ?? '',
              recomendedValue: labresult?.recomendedValue ?? '',
              abnormalRangeCode: labresult?.abnormalRangeCode ?? '',
              physicianComments: labresult?.physicianComments ?? '',
              labTestId: labresult.labTestId,
            }
          })
      : []

  return {
    labResults: labTestData,
    editingLabResultId: undefined,
  }
}

const transformOut = (labResult: LabResultPayload) => {
  return {
    id: labResult.id || '',
    labTestId: labResult.labTestId || '',
    orderId: labResult.orderId || '',
    observationTime: formatDateToISOString(
      labResult.observationTime as DateValue,
    ),
    resultName: labResult.resultName || '',
    recordStatus: labResult.recordStatus || '',
    resultCode: labResult.resultCode || '',
    resultValue: labResult.resultValue || '',
    resultValueUnit: labResult.resultValueUnit || '',
    recomendedValue: labResult.recomendedValue || '',
    abnormalRangeCode: labResult.abnormalRangeCode || '',
    physicianComments: labResult.physicianComments || '',
  }
}

export { transformInDefault, transformOut }
