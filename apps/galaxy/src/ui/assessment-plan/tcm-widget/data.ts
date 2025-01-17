import { da } from 'date-fns/locale'
import { DateValue } from 'react-aria-components'
import { updateVisitAction } from '@/actions'
import {
  Appointment,
  BookVisitPayload,
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  formatDateToISOString,
  getDateDifference,
  getLocalCalendarDate,
  getPaddedDateString,
  manageCodes,
  sanitizeFormData,
} from '@/utils'
import { TcmWidgetSchemaType } from './tcm-widget-schema'
import { tcmCodes } from './utils'

export const tmsKeys = [
  {
    label: 'DC Date:',
    key: 'dcDate',
  },
  {
    label: 'DC Hospital Name:',
    key: 'dcHospitalName',
  },
  {
    label: 'DC Hospital Service Type:',
    key: 'dcHospitalServiceType',
  },
  {
    label: 'Contact Made By:',
    key: 'dcContactMadeBy',
  },
  {
    label: 'Date:',
    key: 'tcmDate',
  },
  {
    label: 'Results:',
    key: 'tcmResults',
  },
]

const transformIn = (
  value: QuickNoteSectionItem[],
  appointmentData?: Appointment,
): TcmWidgetSchemaType => {
  const result: Record<string, string | DateValue | null> = {
    dcDate: appointmentData?.dischargeDate
      ? getLocalCalendarDate(appointmentData?.dischargeDate)
      : null,
    dcHospitalName: appointmentData?.dischargeLocationName || '',
    dcHospitalServiceType: '',
    dcContactMadeBy: '',
    tcmDate: null,
    tcmResults: '',
  }
  value.forEach((item) => {
    result[item.sectionItem as keyof TcmWidgetSchemaType] =
      item.sectionItemValue
  })
  return result as TcmWidgetSchemaType
}

const transformOut =
  (patientId: string, appointmentId: string, appointmentData: Appointment) =>
  async (schema: Record<string, string | DateValue | null>) => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      let newValue = value
      if ((key === 'dcDate' || key === 'tcmDate') && value) {
        newValue = value.toString()
      }
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuicknoteSectionTcm,
        sectionItem: key,
        sectionItemValue: newValue as string,
      })
    })

    const selectedCodes: CodesWidgetItem[] = []
    const codesResult: QuickNoteSectionItem[] = []

    if (data.dcDate) {
      const dischargeDate = data.dcDate as DateValue
      let datesDifference = 0
      if (data.tcmDate) {
        const serviceDate = data.tcmDate as DateValue
        datesDifference = getDateDifference(serviceDate, dischargeDate)
      }

      const addCodes = (codes: CodesWidgetItem[]) => {
        selectedCodes.push(...codes)
      }

      if (datesDifference <= 7) {
        addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99496' }])
      } else if (datesDifference <= 14) {
        addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code: '99495' }])
      }
      if (selectedCodes.length) {
        codesResult.push(
          ...(await manageCodes(
            patientId,
            appointmentId,
            tcmCodes,
            selectedCodes,
          )),
        )
      }
    }

    appointmentData.dischargeDate =
      formatDateToISOString(data.dcDate as DateValue) || ''
    appointmentData.dischargeLocationName =
      (data.dcHospitalName as string) || ''
    const payload: BookVisitPayload =
      transformVisitUpdatePayload(appointmentData)
    const sanitizedData = sanitizeFormData(payload)
    await updateVisitAction(sanitizedData)
    return [...result, ...codesResult]
  }

const transformVisitUpdatePayload = (data: Appointment) => {
  const payload: BookVisitPayload = {
    appointmentId: data.appointmentId,
    patientId: data.patientId,
    stateCode: data.stateCode,
    locationId: data.locationId,
    dischargeDate: data.dischargeDate,
    dischargeLocation: data.dischargeLocationName,
    serviceId: data.serviceId,
    providerType: data.providerType,
    encounterType: data.visitTypeCode,
    visitSequenceType: data.visitSequence,
    type: data.visitMedium,
    paymentResponsibilityTypeCode: data.paymentResponsibility,
    isFollowup: false,
    isPrimaryProviderType: data.isPrimaryProviderType,
    specialistStaffId: data.providerId,
    startDate: data.appointmentDate || '',
    durationMinutes: data.duration || 0,
    visitFrequency: data.appointmentInterval,
    isOverridePermissionProvided: true,
    isProceedPermissionProvided: false,
  }
  return payload
}

export { transformIn, transformOut }
