import { DateValue } from 'react-aria-components'
import {
  Appointment,
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import {
  INJECTION_BLOCK_OPTIONS,
  INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS,
  THERAPY_OPTIONS,
  THERAPY_PSYCHOANALYSIS_TABLE_DATA,
} from './constants'
import { addOnCodes, getCptCodeMap } from './cpt-code-map'

interface ModalityTransferenceData {
  value: string
  display: string
}

const transformIn = (
  value: QuickNoteSectionItem[],
  appointmentData?: Appointment[],
  visitType?: string,
): AddOnWidgetSchemaType => {
  const therapy = visitType
    ? ['Outpatient', 'EdVisit', 'TransitionalCare'].includes(visitType)
    : false
  let therapyPsychoanalysis = ''
  if (therapy && appointmentData) {
    therapyPsychoanalysis =
      appointmentData.length >= 2 ? 'psychoanalysis' : 'therapy'
  }

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
    therapy,
    therapyPsychoanalysis,
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
    additionalTherapyDetail:
      'Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences.  Provider engaged in schema exploration with patient to gain insight regarding patient’s irrational thoughts and maladaptive behavior patterns. Provider encouraged patient to self-reflect to make connections between dysfunctional beliefs, behaviors, and assumptions that may have affected their perception. Continued exploration of irrational thoughts and behaviors is recommended to map all types and directions of transference.',
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

    if (THERAPY_PSYCHOANALYSIS_TABLE_DATA.includes(key)) {
      const columnData = itemValue.split(',')
      const modifiedData = columnData
        .map((data) => {
          const [value, display] = data.split('|')
          return { value, display }
        })
        .filter((data) => data.value && data.display)
      result[key] = modifiedData
    } else {
      switch (itemValue) {
        case 'true':
          result[key] = true
          break
        case 'false':
          result[key] = false
          break
        case 'undefined':
          result[key] = ''
          break
        default:
          result[key] = itemValue
          break
      }
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
    const formData = sanitizeFormData(schema)
    const tranformProps = {
      patientId,
      appointmentId,
      schema: formData,
    }
    if (!formData) return result
    if (formData.injection) {
      const injectionSections = await transfromOutInjectionBlock(tranformProps)
      result.push(...injectionSections)
    }
    if (formData.interactiveComplexity) {
      const interactiveComplexitySections =
        await transfromOutInteractiveComplexity(tranformProps)
      result.push(...interactiveComplexitySections)
    }
    if (formData.therapy) {
      if (formData.therapyPsychoanalysis === 'therapy') {
        const therapySections = await transfromOutTherapyBlock(tranformProps)
        result.push(...therapySections)
      }
      if (formData.therapyPsychoanalysis === 'psychoanalysis') {
        const psychoanalysisSections = await transfromOutPsychoanalysisBlock(
          tranformProps,
        )
        result.push(...psychoanalysisSections)
      }
    }

    const selectedCodes = await getCodes(schema, visitType)
    const codesResult = await manageCodes(
      patientId,
      appointmentId,
      addOnCodes,
      selectedCodes,
    )

    if (result.length === 0) {
      const QuickNotesPayload = {
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.Addon,
        appointmentId: Number(appointmentId),
      }
      result.push({
        ...QuickNotesPayload,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }
    result.push(...codesResult)

    return result
  }

const transfromOutInjectionBlock = (tranformProps: {
  patientId: string
  appointmentId: string
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >
}) => {
  const { patientId, appointmentId, schema } = tranformProps

  const QuickNotesPayload = {
    pid: Number(patientId),
    sectionName: QuickNoteSectionName.Addon,
    appointmentId: Number(appointmentId),
  }

  const result: QuickNoteSectionItem[] = [
    {
      ...QuickNotesPayload,
      sectionItem: 'injection',
      sectionItemValue: 'true',
    },
  ]

  INJECTION_BLOCK_OPTIONS.forEach((option) => {
    if (schema[option])
      result.push({
        ...QuickNotesPayload,
        sectionItem: option,
        sectionItemValue: String(schema[option]),
      })
  })
  return result
}

const transfromOutInteractiveComplexity = (tranformProps: {
  patientId: string
  appointmentId: string
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >
}) => {
  const { patientId, appointmentId, schema } = tranformProps

  const QuickNotesPayload = {
    pid: Number(patientId),
    sectionName: QuickNoteSectionName.Addon,
    appointmentId: Number(appointmentId),
  }

  const result: QuickNoteSectionItem[] = [
    {
      ...QuickNotesPayload,
      sectionItem: 'interactiveComplexity',
      sectionItemValue: 'true',
    },
  ]

  INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS.forEach((option) => {
    console.log(schema[option.field], 'schema[option.field]')

    if (schema[option.field]) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: option.field,
        sectionItemValue: 'true',
      })
    }
  })

  return result
}

const transfromOutTherapyBlock = (tranformProps: {
  patientId: string
  appointmentId: string
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >
}) => {
  const { patientId, appointmentId, schema } = tranformProps

  const QuickNotesPayload = {
    pid: Number(patientId),
    sectionName: QuickNoteSectionName.Addon,
    appointmentId: Number(appointmentId),
  }
  const result: QuickNoteSectionItem[] = [
    {
      ...QuickNotesPayload,
      sectionItem: 'therapy',
      sectionItemValue: 'true',
    },
    {
      ...QuickNotesPayload,
      sectionItem: 'therapyPsychoanalysis',
      sectionItemValue: 'therapy',
    },
  ]

  THERAPY_OPTIONS.forEach((option) => {
    const data = schema[option]
    if (data) {
      result.push({
        ...QuickNotesPayload,
        sectionItem: option,
        sectionItemValue: String(data),
      })
    }
  })

  const arrayData = ['therapyDetailsInterventions', 'therapyDetailsModality']

  arrayData.forEach((item) => {
    if (schema[item] && typeof schema[item] === 'object') {
      let value = ''
      schema[item]?.forEach((data: ModalityTransferenceData) => {
        value += `${data.value}|${data.display},`
      })
      result.push({
        ...QuickNotesPayload,
        sectionItem: item,
        sectionItemValue: value,
      })
    }
  })

  return result
}

const transfromOutPsychoanalysisBlock = (tranformProps: {
  patientId: string
  appointmentId: string
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >
}) => {
  const { patientId, appointmentId, schema } = tranformProps
  const QuickNotesPayload = {
    pid: Number(patientId),
    sectionName: QuickNoteSectionName.Addon,
    appointmentId: Number(appointmentId),
  }
  const result: QuickNoteSectionItem[] = [
    {
      ...QuickNotesPayload,
      sectionItem: 'therapy',
      sectionItemValue: 'true',
    },
    {
      ...QuickNotesPayload,
      sectionItem: 'therapyPsychoanalysis',
      sectionItemValue: 'psychoanalysis',
    },
    {
      ...QuickNotesPayload,
      sectionItem: 'additionalPsychoAnalysisDetail',
      sectionItemValue: String(schema.additionalPsychoAnalysisDetail),
    },
  ]

  const arrayData = ['psychoanalyticTechnique', 'transferenceDescription']

  arrayData.forEach((item) => {
    if (schema[item] && typeof schema[item] === 'object') {
      let value = ''
      schema[item]?.forEach((data: ModalityTransferenceData) => {
        value += `${data.value}|${data.display},`
      })
      result.push({
        ...QuickNotesPayload,
        sectionItem: item,
        sectionItemValue: value,
      })
    }
  })

  return result
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
