import { LabResult, LabResultPayload } from '@/types'
import { getDateString, getDateStringNoon } from '@/ui/schedule/utils'
import { getCalendarDate } from '@/utils'

const transformOut = (labResult: LabResultPayload, labTestId?: string) => {
  return {
    ...(labResult.id ? { id: labResult.id } : {}),
    labTestId: labResult.labTestId ?? labTestId,
    orderId: labResult.orderId || '',
    observationTime: getDateStringNoon(labResult?.observationTime ?? null),
    resultName: labResult.resultName ?? '',
    statusCode: labResult.statusCode ?? '',
    resultCode: labResult.resultCode ?? '',
    resultValue: labResult.resultValue ?? '',
    resultValueUnit: labResult.resultValueUnit ?? '',
    recomendedValue: labResult.recomendedValue ?? '',
    abnormalRangeCode: labResult.abnormalRangeCode ?? '',
    physicianComments: labResult.physicianComments ?? '',
  }
}
const tranformIn = (labResult: LabResult) => {
  return {
    id: labResult.id,
    orderId: labResult.orderId,
    observationTime: getCalendarDate(labResult?.observationTime as string),
    resultName: labResult?.resultName ?? '',
    statusCode: labResult?.statusCode ?? '',
    resultCode: labResult?.resultCode ?? '',
    resultValue: labResult?.resultValue ?? '',
    resultValueUnit: labResult?.resultValueUnit,
    recomendedValue: labResult?.recomendedValue ?? '',
    abnormalRangeCode: labResult?.abnormalRangeCode ?? '',
    physicianComments: labResult?.physicianComments ?? '',
    labTestId: labResult.labTestId,
  }
}

export { transformOut, tranformIn }
