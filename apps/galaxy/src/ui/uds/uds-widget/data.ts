import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { DRUGS_DIAGNOSIS_MAP } from './constants'
import { createEmptyFormValues } from './uds-defaults'
import { UdsWidgetSchemaType } from './uds-widget-schema'

const transformIn = (
  value?: QuickNoteSectionItem[],
  isContainsUrineTest?: boolean,
  isActualNoteView?: boolean,
): UdsWidgetSchemaType => {
  const result = createEmptyFormValues(isContainsUrineTest)
  const confirmatoryTesting = isContainsUrineTest ? 'yes' : 'no'

  value?.forEach((item) => {
    if (item.sectionItem === 'confirmationReasons') {
      result.confirmationReasons = item.sectionItemValue.split(',') ?? []
    }
    if (item.sectionItem === 'purposeOfVisit') {
      result.purposeOfVisit = item.sectionItemValue
    }
    if (item.sectionItem === 'medicalNecessity') {
      result.medicalNecessity = item.sectionItemValue.split(',') ?? []
    }
    if (item.sectionItem === 'confirmatoryTesting') {
      result.confirmatoryTesting = isActualNoteView
        ? item.sectionItemValue
        : confirmatoryTesting
    }
    if (item.sectionItem === 'result') {
      result.result = item.sectionItemValue
    }
    if (item.sectionItem === 'resultAction') {
      result.resultAction = item.sectionItemValue
    }
    if (item.sectionItem === 'udsOther') {
      result.udsOther = item.sectionItemValue
    }
  })

  return result as UdsWidgetSchemaType
}

const transformOut =
  (
    patientId: string,
    appointmentId: string,
    diagnosisData?: QuickNoteSectionItem[],
    isHospitalDischargeView?: boolean,
    isUdsTab?: boolean,
  ) =>
  async (schema: UdsWidgetSchemaType) => {
    if (!schema.medicalNecessity?.includes('Other')) {
      schema.udsOther = ''
    }
    const result: QuickNoteSectionItem[] = []

    const sanitizedFormData = sanitizeFormData(schema)

    Object.entries(sanitizedFormData).forEach(([key, value]) => {
      result.push({
        pid: Number(patientId),
        appId: Number(appointmentId),
        sectionName: QuickNoteSectionName.QuicknoteSectionUds,
        sectionItem: key,
        sectionItemValue: `${value}`,
      })
    })
    const diagnosisSections = await getDiagnosisSections(
      schema,
      patientId,
      diagnosisData,
      isUdsTab ? false : true,
      isHospitalDischargeView,
    )

    return [...result, ...diagnosisSections]
  }

const getDiagnosisSections = async (
  schema: UdsWidgetSchemaType,
  patientId: string,
  diagnosisData: QuickNoteSectionItem[] = [],

  isQuicknoteView?: boolean,
  isHospitalDischargeView?: boolean,
) => {
  const sectionName = isHospitalDischargeView
    ? QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
    : QuickNoteSectionName.QuickNoteSectionDiagnosis

  let data: QuickNoteSectionItem[] = diagnosisData

  if (!isQuicknoteView) {
    const response = await getQuickNoteDetailAction(patientId, [sectionName])
    if (response.state === 'error') {
      return []
    }
    data = response.data
  }

  const formData = sanitizeFormData(schema)
  const { medicalNecessity = [] } = formData

  const existingCodes =
    data?.[0]?.sectionItemValue?.split(',').map((code) => code.trim()) || []

  const newCodes = medicalNecessity
    .map((key) => DRUGS_DIAGNOSIS_MAP[key])
    .filter((code): code is string => !!code && !existingCodes.includes(code))

  const combinedCodes = Array.from(new Set([...existingCodes, ...newCodes]))

  const sectionItemValue = combinedCodes.join(',')

  const diagnosisCodesToAddSet = [
    {
      pid: Number(patientId),
      sectionName,
      sectionItem: 'diagnosis',
      sectionItemValue,
    },
  ]

  return diagnosisCodesToAddSet
}

export { transformOut, transformIn }
