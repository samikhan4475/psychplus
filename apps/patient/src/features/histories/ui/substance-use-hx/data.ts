import { sanitizeFormData } from '@psychplus-v2/utils'
import { CodesWidgetItem, UpdateCptCodes } from '@/features/codes/types'
import { manageCodes } from '@/features/codes/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { SubstanceUseSchemaType } from './substance-use-hx-schema'
import { getInitialValues, substanceCptCodes } from './utils'
const TOBACCO_OPTIONS = [
  'tobaccoChewSmoke',
  'smokePacks',
]

const DRUGS_OPTIONS = [
  'inhalants',
  'pcp',
  'amphetamine',
  'cocaine',
  'sedative',
  'opioids',
]

const TOBACCO_DRUGS_ALCOHOL_QUESTIONNAIRE = [
  'tobacco',
  'drugs',
  'alcohol',
]
const transformIn = (
  list: NoteSectionItem[],
): SubstanceUseSchemaType => {
  const result: Record<
    string,
    number | string | undefined | boolean | string[] | null
  > = getInitialValues()

  const value = list.filter(
    (item) =>
      item.sectionName === NoteSectionName.NoteSectionSubstanceUseHx,
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

  return result as SubstanceUseSchemaType
}

const transformOut =
  (
    patientId: string,
    diagnosisData?: NoteSectionItem[],
  ) =>
    async (
      schema: Record<string, undefined>,
      updateCptCodes?: UpdateCptCodes,
    ) => {
      const result = []
      const selectedCodes: CodesWidgetItem[] = []

      const QuickNotesPayload = {
        pid: Number(patientId),
        sectionName: NoteSectionName.NoteSectionSubstanceUseHx,
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
              `${key}Details` as keyof SubstanceUseSchemaType
            result.push({
              ...QuickNotesPayload,
              sectionItem: key,
              sectionItemValue: String(formData[detailsKey]),
            })
          }

        }
      })
      if (formData.widgetContainerCheckboxField) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: 'widgetContainerCheckboxField',
          sectionItemValue: formData.widgetContainerCheckboxField,
        })
      }

      if (updateCptCodes) {
        const updatedCodes =
          (await updateCptCodes?.(
            patientId,
            substanceCptCodes,
            selectedCodes,
          )) ?? []
        result.push(...updatedCodes)
      } else {
        result.push(
          ...(await manageCodes(
            patientId,
            substanceCptCodes,
            selectedCodes,
          )),
        )
      }

      const diagnosisSections = await getDiagnosisSections(
        schema,
        patientId,
        diagnosisData,
      )
      if (!result.length) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: 'empty',
          sectionItemValue: 'true',
        })
      }
      return diagnosisSections.length ? [...result, ...diagnosisSections] : [...result]

    }

const getDiagnosisSections = async (
  schema: Record<string, undefined>,
  patientId: string,
  diagnosisData: NoteSectionItem[] = [],
) => {
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
    diagnosisData?.[0]?.sectionItemValue
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

  if (!diagnosisCodesToAdd.length) {
    return []
  }

  const sectionItemValue = String(
    diagnosisCodesToAdd.filter(
      (item, index) => diagnosisCodesToAdd.indexOf(item) === index,
    ),
  )
  const diagnosisCodesToAddSet = [
    {
      pid: Number(patientId),
      sectionName: NoteSectionName.NoteSectionDiagnosis,
      sectionItem: 'diagnosis',
      sectionItemValue: sectionItemValue,
    },
  ]

  return diagnosisCodesToAddSet
}

export { transformIn, transformOut }
