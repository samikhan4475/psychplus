import { DateValue } from 'react-aria-components'
import { CodesWidgetItem, CptCodeKeys, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import { addOnCodes, getCptCodeMap } from './cpt-code-map'

interface ModalityTransferenceData {
  value: string
  display: string
}

const INJECTION_BLOCK_OPTIONS = [
  'drugName',
  'dose',
  'siteLocations',
  'manufacturer',
  'lotNumber',
  'expirationDate',
]

const INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS = [
  {
    label:
      'The need to manage maladaptive communication (related to, e.g., high anxiety, high reactivity, repeated questions, or disagreement) among participants that complicates delivery of care.',
    field: 'maladaptiveCommunication',
  },
  {
    label:
      'Caregiver emotions or behaviors that interfere with implementation of the treatment plan.',
    field: 'caregiverEmotions',
  },
  {
    label:
      'Evidence or disclosure of a sentinel event and mandated report to a third party (e.g., abuse or neglect with report to state agency) with initiation of discussion of the sentinel event and/or report with patient and other visit participants',
    field: 'sentinelEvent',
  },
  {
    label:
      'Use of play equipment, physical devices, interpreter or translator to overcome barriers to diagnostic or therapeutic interaction with a patient who is not fluent in the same language or who has not developed or lost expressive or receptive language skills to use or understand typical language.',
    field: 'languageBarrier',
  },
]

const THERAPY_OPTIONS = [
  'therapyTimeSpent',
  'timeRangeOne',
  'timeRangeTwo',
  'timeRangeThree',
  'therapySessionParticipants',
  'additionalTherapyDetail',
]

const THERAPY_PSYCHOANALYSIS_TABLE_DATA = [
  'therapyDetailsModality',
  'therapyDetailsInterventions',
  'transferenceDescription',
  'psychoanalyticTechnique',
]

const transformIn = (value: QuickNoteSectionItem[]): AddOnWidgetSchemaType => {
  const result: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[] | DateValue
  > = {
    injection: false,
    drugName: '',
    dose: '',
    siteLocations: '',
    manufacturer: '',
    lotNumber: '',
    expirationDate: '',
    therapy: false,
    therapyPsychoanalysis: 'therapy',
    therapyTimeSpent: undefined,
    timeRangeOne: undefined,
    timeRangeTwo: undefined,
    timeRangeThree: undefined,
    therapySessionParticipants: undefined,
    patientOther: undefined,
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    transferenceDescription: [],
    psychoanalyticTechnique: [],
    additionalTherapyDetail: '',
    additionalPsychoAnalysisDetail: '',
    interactiveComplexity: false,
    maladaptiveCommunication: false,
    caregiverEmotions: false,
    sentinelEvent: false,
    languageBarrier: false,
    ect: false,
    seriesMaintenance: 'series',
    series: '',
    maintenance: '',
    biteblock: 'yes',
    timeOut: '',
    timeOfProcedure: '',
    ectTypeBlock: '',
    ectSettingBlockPw: '',
    ectSettingBlockFrequency: '120',
    ectSettingBlockDuration: '8',
    ectSettingBlockCurrent: '800',
    ectSeizureDuration: '000',
    ectPostOpMedicationBlock: '',
    ectPostOpMedicationBlockDetails: '',
    ectComplicationsBlock: '',
    ectComplicationsBlockDetails: '',
    ectAssessment: '',
    ectContinuePBlock: '',
    providerType: '',
  }

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (itemValue === 'true') {
      result[key] = true
    } else if (THERAPY_PSYCHOANALYSIS_TABLE_DATA.includes(key)) {
      const columnData = itemValue.split(',')
      const modifiedData = columnData.map((data) => {
        const [value, ...displayParts] = data.split(' ')
        const display = displayParts.join(' ')
        return { value, display }
      })

      result[key] = modifiedData
    } else if (key === 'expirationDate') {
      result['expirationDate'] = itemValue
    } else if (key in result) {
      result[key] = itemValue
    }
  })

  return result as AddOnWidgetSchemaType
}

const transformOut =
  (patientId: string, appointmentId: string, visitType: string) =>
  async (
    schema: Record<
      string,
      string | undefined | boolean | ModalityTransferenceData[]
    >,
  ): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    const injectionSectionValue = INJECTION_BLOCK_OPTIONS.every(
      (option) =>
        schema[option] === '' ||
        schema[option] === null ||
        schema[option] === undefined,
    )
    const interactiveComplexitySectionValue =
      INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.every(
        (option) =>
          schema[option.field] === false || schema[option.field] === undefined,
      )

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.Addon,
      appointmentId: Number(appointmentId),
    }
    if (!schema.injection) {
      INJECTION_BLOCK_OPTIONS.forEach((option) => {
        schema[option] = undefined
      })
    }
    if (injectionSectionValue) {
      schema['injection'] = false
    }
    if (
      typeof schema.therapyTimeSpent === 'string' &&
      ['16-37 mins', '38-52 mins', '53-99 mins'].includes(
        schema.therapyTimeSpent,
      )
    ) {
      const timeKeys = ['16-37 mins', '38-52 mins', '53-99 mins']

      timeKeys.forEach((key) => {
        if (key !== schema.therapyTimeSpent) {
          schema[key] = undefined
        }
      })
    }

    if (schema.therapyPsychoanalysis === 'neither') {
      THERAPY_PSYCHOANALYSIS_TABLE_DATA.forEach((option) => {
        schema[option] = []
      })
      THERAPY_OPTIONS.forEach((option) => {
        schema[option] = undefined
      })
      schema['additionalPsychoAnalysisDetail'] = undefined
    }

    if (schema.therapyPsychoanalysis === 'therapy') {
      schema['transferenceDescription'] = []
      schema['psychoanalyticTechnique'] = []
      schema['additionalPsychoAnalysisDetail'] = undefined
    }
    if (schema.therapyPsychoanalysis === 'psychoanalysis') {
      THERAPY_OPTIONS.forEach((option) => {
        schema[option] = undefined
      })
      schema['therapyDetailsModality'] = []
      schema['therapyDetailsInterventions'] = []
    }
    if (interactiveComplexitySectionValue) {
      schema['interactiveComplexity'] = false
    }
    if (!schema.interactiveComplexity) {
      INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.forEach((option) => {
        schema[option.field] = undefined
      })
    }

    const formData = sanitizeFormData(schema)

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const updatedData = (value as ModalityTransferenceData[]).map(
          (item: ModalityTransferenceData) => `${item.value} ${item.display}`,
        )
        result.push({
          ...QuickNotesPayload,
          sectionItem: key,
          sectionItemValue: String(updatedData),
        })
      } else if (key === 'expirationDate' && value) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: key,
          sectionItemValue: value.toString(),
        })
      } else if (value) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: key,
          sectionItemValue: String(value),
        })
      }
    })

    const selectedCodes = await getCodes(schema, visitType)
    const codesResult = await manageCodes(
      patientId,
      appointmentId,
      addOnCodes,
      selectedCodes,
    )

    return [...result, ...codesResult]
  }

const getCodes = async (
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >,
  visitType: string,
) => {
  const selectedCodes: CodesWidgetItem[] = []
  const cptCodeMap = await getCptCodeMap(visitType)
  Object.entries(cptCodeMap).forEach(([key, value]) => {
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
  return selectedCodes
}

export { transformIn, transformOut }
