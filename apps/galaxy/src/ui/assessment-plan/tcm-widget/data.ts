import { formatISO } from 'date-fns'
import { DateValue } from 'react-aria-components'
import { updateVisitAction } from '@/actions'
import {
  Appointment,
  BookVisitPayload,
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
  UpdateCptCodes,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  formatDateToISOString,
  getDateDifference,
  getLocalCalendarDate,
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
  const result: Record<string, string | DateValue | null | boolean> = {
    dcDate: appointmentData?.dischargeDate
      ? getLocalCalendarDate(appointmentData?.dischargeDate)
      : null,
    dcHospitalName: appointmentData?.dischargeLocationName ?? '',
    dcHospitalServiceType: '',
    dcContactMadeBy: '',
    tcmDate: null,
    tcmResults: '',
    tcmResultCheckBox: true,
  }
  value.forEach((item) => {
    if (item.sectionItem === 'tcmResultCheckBox' && typeof item.sectionItemValue === 'string') {
      result[item.sectionItem as keyof TcmWidgetSchemaType] = true;
    } else {
      result[item.sectionItem as keyof TcmWidgetSchemaType] = item.sectionItemValue;
    }
  });
  return result as TcmWidgetSchemaType
}

const transformOut =
  (patientId: string, appointmentId: string, appointmentData: Appointment) =>
  async (
    schema: Record<string, string | DateValue | null>,
    isSubmitting = false,
    updateCptCodes?: UpdateCptCodes,
  ) => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)

    Object.entries(data).forEach(([key, value]) => {
      let newValue = value
      if ((key === 'dcDate' || key === 'tcmDate') && value) {
        newValue = value.toString()
      }
      if(key === 'tcmResultCheckBox'){
        newValue = "true"
      }
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuicknoteSectionTcm,
        sectionItem: key,
        sectionItemValue: newValue as string,
      })
    })
    const selectedCodes: CodesWidgetItem[] = []
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

      if (dischargeDate && data.tcmDate) {
        let code: string | null = null

        if (datesDifference <= 7) {
          code = '99496'
        } else if (datesDifference <= 14) {
          code = '99495'
        }

        if (code) {
          addCodes([{ key: CptCodeKeys.PRIMARY_CODE_KEY, code }])
        }
      }
    }
    if (!result.length) {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuicknoteSectionTcm,
        sectionItem: '1',
        sectionItemValue: '1',
      })
    }
    if (updateCptCodes) {
      const updatedCodes =
        (await updateCptCodes?.(
          patientId,
          appointmentId,
          tcmCodes,
          selectedCodes,
        )) ?? []
      result.push(...updatedCodes)
    } else {
      result.push(
        ...(await manageCodes(
          patientId,
          appointmentId,
          tcmCodes,
          selectedCodes,
        )),
      )
    }
    if (isSubmitting) {
      appointmentData.dischargeDate =
        formatDateToISOString(data.dcDate as DateValue) ?? ''
      appointmentData.dischargeLocationName =
        (data.dcHospitalName as string) || ''
      const payload: BookVisitPayload =
        transformVisitUpdatePayload(appointmentData)
      const sanitizedData = sanitizeFormData(payload)
      await updateVisitAction(sanitizedData)
    }

    return result
  }

const transformVisitUpdatePayload = (
  data: Appointment,
  sections: QuickNoteSectionItem[] = [],
): BookVisitPayload => {
  const dcDate = sections?.find(
    (section) => section?.sectionItem === 'dcDate',
  )?.sectionItemValue
  const dischargeLocationName = sections?.find(
    (section) => section?.sectionItem === 'dcHospitalName',
  )?.sectionItemValue

  const payload: BookVisitPayload = {
    appointmentId: data.id,
    patientId: data.patientId,
    stateCode: data.stateCode,
    locationId: data.locationId,
    serviceId: data.serviceId,
    providerType: data.providerType,
    encounterType: data.visitTypeCode,
    visitSequenceType: data.visitSequence,
    type: data.visitMedium,
    paymentResponsibilityTypeCode: data.paymentResponsibility,
    isFollowup: false,
    isPrimaryProviderType: data.isPrimaryProviderType,
    specialistStaffId: data.providerId,
    startDate: data.appointmentDate ?? '',
    durationMinutes: data.duration ?? 0,
    visitFrequency: data.appointmentInterval,
    isOverridePermissionProvided: true,
    isProceedPermissionProvided: false,
    dischargeDate: dcDate ? formatISO(new Date(dcDate)) : data.dischargeDate,
    dischargeLocation: dischargeLocationName ?? data.dischargeLocationName,
  }
  return payload
}

export { transformIn, transformOut, transformVisitUpdatePayload }
