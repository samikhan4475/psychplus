import toast from 'react-hot-toast'
import { saveWidgetClientAction, updateVisitAction } from '@/actions'
import { CustomToaster as customContentToaster } from '@/components/custom-content-toast'
import { VisitTypeEnum } from '@/enum'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { ALLERGIES_ERROR_MESSAGE } from '@/ui/allergy/patient-allergies-widget/constants'
import { AllergyDataResponse } from '@/ui/allergy/patient-allergies-widget/types'
import { transformVisitUpdatePayload } from '@/ui/assessment-plan/tcm-widget/data'
import { postEvent, sanitizeFormData, saveAbleWdgets } from '@/utils'
import { QuickNoteSectionName } from '../constants'
import { ValidateDiagnosisParams } from '../types'
import { getWidgetErrorDetails, getWidgetsByVisitType } from '../utils'

const getWidgetData = (providerType: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const visitType = urlParams.get('visitType') as string
  const visitSequence = urlParams.get('visitSequence') as string

  const widgets =
    getWidgetsByVisitType(visitType, visitSequence, providerType).map(
      (widget) => widget.id,
    ) || []

  const savingWidgets = saveAbleWdgets.filter((widget) => {
    return widgets.includes(widget)
  })
  return {
    widgets: savingWidgets,
    providerType,
    visitType,
    visitSequence,
  }
}

const updateAppointment = (
  appointment: Appointment,
  sections: QuickNoteSectionItem[] = [],
) => {
  if (appointment.visitTypeCode !== VisitTypeEnum.TransitionalCare) {
    return undefined
  }
  const data = sections.filter(
    (section) =>
      section?.sectionName === QuickNoteSectionName.QuicknoteSectionTcm,
  )
  return updateVisitAction(
    sanitizeFormData(transformVisitUpdatePayload(appointment, data)),
  )
}

const saveWidgets = async (
  appointment: Appointment,
  sections: QuickNoteSectionItem[],
  shouldValidate = false,
) => {
  const { widgets } = getWidgetData(appointment.providerType)

  if (shouldValidate) {
    const isValidateAll = await validateAll(widgets, appointment.visitTypeCode)
    if (!isValidateAll) {
      return { validationFailed: true, data: [] }
    }
  }
  const payload = {
    patientId: String(sections?.[0]?.pid),
    data: sections,
  }
  try {
    const [widgetsResult, _] = await Promise.all([
      saveWidgetClientAction(payload),
      updateAppointment(appointment, sections),
    ])
    if (widgetsResult.state === 'error') {
      toast.error('Failed to save!')
      return { validationFailed: false, data: [] }
    }
    return { data: sections, validationFailed: false }
  } catch (error) {
    toast.error('Failed to save!')
    return { validationFailed: false, data: [] }
  }
}

const validateAll = async (
  widgets: QuickNoteSectionName[],
  visitTypeCode?: string,
) => {
  const promises = widgets.map((widgetId) => {
    return new Promise<{ success: boolean; widgetId: string }>((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data.type === 'widget:validate' &&
          event.data.widgetId === widgetId
        ) {
          window.removeEventListener('message', handleMessage)
          resolve(event.data)
        }
      }

      window.addEventListener('message', handleMessage)
    })
  })
  postEvent({ type: 'quicknotes:validateAll' })
  const responses = await Promise.all(promises)
  let widgetErrors = ''
  responses.forEach((element) => {
    if (!element.success) {
      widgetErrors += `${element.widgetId.replace('QuicknoteSection', '')}, `
    }
  })
  widgetErrors = widgetErrors.slice(0, widgetErrors.length - 2)
  if (widgetErrors !== '') {
    let errorKey
    switch (true) {
      case visitTypeCode === 'Tms':
        errorKey = 'TMS'
        break

      case visitTypeCode === 'Spravato':
        errorKey = 'Spravato'
        break

      case visitTypeCode === 'Ect':
        errorKey = 'ECT'
        break

      case widgetErrors.includes('AddOn'):
        errorKey = 'AddOn'
        break

      default:
        break
    }
    const details = getWidgetErrorDetails(errorKey, widgetErrors)
    customContentToaster({
      title: 'Validation Error',
      message: `Please fill out all required fields in`,
      details,
    })
  }
  return responses.every((element) => element.success)
}

const visitTypeDiagnosisMap: Partial<Record<VisitTypeEnum, string[]>> = {
  [VisitTypeEnum.Spravato]: [
    'F32.1',
    'F32.2',
    'F32.3',
    'F33.1',
    'F33.2',
    'F33.3',
  ],
  [VisitTypeEnum.Tms]: [
    'F32.2',
    'F32.3',
    'F33.2',
    'F33.3',
    'F42.2',
    'F42.3',
    'F42.4',
    'F42.8',
    'F42.9',
  ],
}

const validateDiagnosis = ({
  workingDiagnosisData,
  visitType,
  setActualNoteData,
  encounterNoteDx,
  patientId,
  appointmentId,
  isHospitalDischarge,
}: ValidateDiagnosisParams) => {
  const requiredCodes = visitTypeDiagnosisMap[visitType as VisitTypeEnum] ?? []
  const hasValidDiagnosis = workingDiagnosisData?.some(({ code }) =>
    requiredCodes.includes(code),
  )

  if (requiredCodes.length > 0 && !hasValidDiagnosis) {
    return `Must have one of the following diagnoses: ${requiredCodes.join(
      ', ',
    )} to Sign/Send to signature.`
  }

  if (
    workingDiagnosisData.length === 0 ||
    (workingDiagnosisData.length === 1 &&
      workingDiagnosisData[0]?.code === 'empty')
  ) {
    return 'Select at least one diagnosis to Sign/Send to signature.'
  }
  const wCodes = workingDiagnosisData.map(({ code }) => code)?.join(',')
  //actual note data
  const enCodes = encounterNoteDx?.[0]?.sectionItemValue ?? ''
  if (wCodes !== enCodes) {
    setActualNoteData([
      {
        pid: +patientId,
        sectionName: isHospitalDischarge
          ? QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
          : QuickNoteSectionName.QuickNoteSectionDiagnosis,
        sectionItem: 'diagnosis',
        ...(isHospitalDischarge ? { appId: +appointmentId } : {}),
        sectionItemValue: wCodes,
      },
    ])
  }

  return ''
}

const validateAllergies = ({
  allergiesData = [],
  visitType,
}: {
  allergiesData?: AllergyDataResponse[]
  visitType: string
}) => {
  const allowedVisitType = [
    VisitTypeEnum.Outpatient,
    VisitTypeEnum.ResidentCare,
    VisitTypeEnum.TransitionalCare,
  ].includes(visitType as VisitTypeEnum)

  if (allowedVisitType && allergiesData.length === 0) {
    return ALLERGIES_ERROR_MESSAGE
  }

  return ''
}

export { getWidgetData, saveWidgets, validateDiagnosis, validateAllergies }
