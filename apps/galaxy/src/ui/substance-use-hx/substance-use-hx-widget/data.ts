import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { WidgetContainerCheckboxField } from '@/components'
import {
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
  UpdateCptCodes,
} from '@/types'
import { validateYesNoEnum } from '@/ui/mse/mse-widget/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import {
  DRUGS_OPTIONS,
  TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE,
  TOBACCO_OPTIONS,
} from './constants'
import { SubstanceUseHxWidgetSchemaType } from './substance-use-hx-schema'
import { cptCodeMap, getInitialValues, substanceCptCodes } from './utils'

const transformIn = (
  list: QuickNoteSectionItem[],
): SubstanceUseHxWidgetSchemaType => {
  const result: Record<
    string,
    number | string | undefined | boolean | string[] | null
  > = getInitialValues()

  const value = list.filter(
    (item) =>
      item.sectionName === QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
  )

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (key === 'referralTreatment') {
      const list = itemValue.split(',')
      result[key] = list || []
    } else if (key === 'briefInterventionDetail') {
      result[key] = itemValue
    } else if (key === 'widgetContainerCheckboxField') {
      result[key] = itemValue
    } else if (key === 'questionnaire') {
      result[key] = validateYesNoEnum(itemValue?.toLowerCase())
    } else if (TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE.includes(key)) {
      result[key] = itemValue
    } else if (TOBACCO_OPTIONS.includes(key)) {
      result[key] = itemValue
    } else if (DRUGS_OPTIONS.includes(key)) {
      const detailKey = `${key}Details`
      result[detailKey] = itemValue === 'undefined' ? '' : itemValue
      result[key] = true
    } else {
      result[key] = itemValue === 'true'
    }
  })

  return result as SubstanceUseHxWidgetSchemaType
}

const transformOut =
  (
    patientId: string,
    appointmentId: string,
    diagnosisData?: QuickNoteSectionItem[],
    isHospitalDischargeView?: boolean,
  ) =>
  async (
    schema: Record<string, undefined>,
    _isSubmitting?: boolean,
    updateCptCodes?: UpdateCptCodes,
  ) => {
    const result: QuickNoteSectionItem[] = []

    const selectedCodes: CodesWidgetItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    }

    if (schema.alcohol === 'no' && schema.drugs === 'no') {
      schema['briefInterventionDetail'] = undefined
    }
    if (schema.tobacco === 'no') {
      TOBACCO_OPTIONS.forEach((option) => {
        schema[option] = undefined
      })
    }
    if (schema.drugs === 'no') {
      DRUGS_OPTIONS.forEach((option) => {
        const detailOption = `${option}Details`
        schema[option] = undefined
        schema[detailOption] = undefined
      })
    }
    const formData = sanitizeFormData(schema)

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE.includes(key)) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(value),
          })
        }
        if (TOBACCO_OPTIONS.includes(key)) {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(value),
          })
        }
        if (DRUGS_OPTIONS.includes(key)) {
          const detailsKey =
            `${key}Details` as keyof SubstanceUseHxWidgetSchemaType
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(formData[detailsKey]),
          })
        }
        if (key === 'briefInterventionDetail') {
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: String(value),
          })
        }
      }
    })
    if (formData.widgetContainerCheckboxField) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: WidgetContainerCheckboxField,
        sectionItemValue: formData.widgetContainerCheckboxField,
      })
    }
    Object.entries(cptCodeMap).forEach(([key, value]) => {
      if (key === 'tobacco' && schema?.smokingCessationDiscussionDuration) {
        return
      }
      const schemaKey = schema?.[key]
      const code =
        typeof value === 'object'
          ? value?.[schemaKey as keyof typeof value]
          : value
      if (code && schemaKey) {
        selectedCodes.push({
          code,
          key: CptCodeKeys.ADD_ONS_KEY,
        })
      }
    })
    if (updateCptCodes) {
      const updatedCodes =
        (await updateCptCodes?.(
          patientId,
          appointmentId,
          substanceCptCodes,
          selectedCodes,
        )) ?? []
      result.push(...updatedCodes)
    } else {
      result.push(
        ...(await manageCodes(
          patientId,
          appointmentId,
          substanceCptCodes,
          selectedCodes,
        )),
      )
    }

    const diagnosisSections = await getDiagnosisSections(
      schema,
      patientId,
      appointmentId,
      diagnosisData,
      updateCptCodes ? true : false,
      isHospitalDischargeView,
    )
    if (!result.length) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }
    return [...result, ...diagnosisSections]
  }

const getDiagnosisSections = async (
  schema: Record<string, undefined>,
  patientId: string,
  appointmentId: string,
  diagnosisData: QuickNoteSectionItem[] = [],
  isQuicknoteView?: boolean,
  isHospitalDischargeView?: boolean,
) => {
  const sectionName = isHospitalDischargeView
    ? QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
    : QuickNoteSectionName.QuickNoteSectionDiagnosis
  let data: QuickNoteSectionItem[] = diagnosisData
  if (!isQuicknoteView) {
    const response = await getQuickNoteDetailAction(
      patientId,
      [sectionName],
      undefined,
      isHospitalDischargeView ? appointmentId : undefined,
    )
    if (response.state === 'error') {
      return []
    }
    data = response.data
  }

  const formData = sanitizeFormData(schema)
  const { tobacco, alcohol, drugs } = formData
  const substanceUseCodes = [
    'F11.10',
    'F13.10',
    'F14.10',
    'F15.10',
    'F16.10',
    'F18.10',
    'F17.200',
    'F10.10',
  ]
  const diagnosisCodesToAdd =
    data?.[0]?.sectionItemValue
      .split(',')
      .filter((item) => !substanceUseCodes.includes(item)) || []
  const drugsDiagnosisMap: Record<string, string> = {
    opioids: 'F11.10',
    sedative: 'F13.10',
    cocaine: 'F14.10',
    amphetamine: 'F15.10',
    pcp: 'F16.10',
    inhalants: 'F18.10',
  }
  if (alcohol === 'yes') diagnosisCodesToAdd.push('F10.10')
  if (drugs === 'yes')
    Object.entries(drugsDiagnosisMap).forEach(([key, code]) => {
      if (formData[key]) {
        diagnosisCodesToAdd.push(code)
      }
    })
  if (tobacco === 'yes') diagnosisCodesToAdd.push('F17.200')

  const sectionItemValue = String(
    diagnosisCodesToAdd.filter(
      (item, index) => diagnosisCodesToAdd.indexOf(item) === index,
    ),
  )
  const diagnosisCodesToAddSet: QuickNoteSectionItem[] = []
  if (sectionItemValue) {
    diagnosisCodesToAddSet.push({
      pid: Number(patientId),
      sectionName,
      sectionItem: 'diagnosis',
      sectionItemValue: sectionItemValue,
      ...(isHospitalDischargeView ? { appId: Number(appointmentId) } : {}),
    })
  }
  return diagnosisCodesToAddSet
}
export { transformIn, transformOut }
