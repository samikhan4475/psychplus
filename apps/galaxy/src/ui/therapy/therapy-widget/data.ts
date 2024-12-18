import { CodesWidgetItem, CptCodeKeys, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import { addOnCodes, getCptCodeMap } from './cpt-code-map'
import {
  TherapySchemaType,
  TherapySessionParticipantsEnum,
  TherapySessionParticipantsEnumType,
} from './therapy-schema'

interface ModalityTransferenceData {
  value: string
  display: string
}

const transformOut =
  (patientId: string, appointmentId: string) =>
  async (schema: TherapySchemaType): Promise<QuickNoteSectionItem[]> => {
    const result: QuickNoteSectionItem[] = []

    const data = sanitizeFormData(schema)

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const updatedData = (value as ModalityTransferenceData[]).map(
          (item: ModalityTransferenceData) => `${item.value} ${item.display}`,
        )
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.Addon,
          sectionItem: key,
          sectionItemValue: String(updatedData),
        })
      } else {
        const sectionItemValue = value as string

        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.Addon,
          sectionItem: key,
          sectionItemValue,
        })
      }
    })
    result.push({
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.Addon,
      sectionItem: 'therapy',
      sectionItemValue: 'true',
    })
    const selectedCodes = await getCodes(schema)
    const codesResult = await manageCodes(
      patientId,
      appointmentId,
      addOnCodes,
      selectedCodes,
    )
    return [...result, ...codesResult]
  }

const transformIn = (value: QuickNoteSectionItem[]): TherapySchemaType => {
  const result: TherapySchemaType = {
    therapyTimeSpent: 'timeRangeOne',
    therapySessionParticipants: TherapySessionParticipantsEnum.Values.Patients,
    patientOther: '',
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail: '',
  }

  value.forEach((item) => {
    const key = item.sectionItem as keyof TherapySchemaType
    const itemValue = item.sectionItemValue

    if (
      key === 'therapyDetailsModality' ||
      key === 'therapyDetailsInterventions'
    ) {
      const columnData = itemValue.split(',')
      const modifiedData = columnData.map((data) => {
        const [value, ...displayParts] = data.split(' ')
        const display = displayParts.join(' ')
        return { value, display }
      })

      result[key] = modifiedData as TherapySchemaType[typeof key]
    } else if (key === 'therapyTimeSpent') {
      result[key] = itemValue as
        | 'timeRangeOne'
        | 'timeRangeTwo'
        | 'timeRangeThree'
    } else if (key === 'therapySessionParticipants') {
      if (
        Object.values(TherapySessionParticipantsEnum.Values).includes(
          itemValue as TherapySessionParticipantsEnumType,
        )
      ) {
        result[key] = itemValue as TherapySessionParticipantsEnumType
      }
    } else {
      result[key] = itemValue as string
    }
  })

  return result
}

const getCodes = async (
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >,
) => {
  const selectedCodes: CodesWidgetItem[] = []
  const cptCodeMap = getCptCodeMap()
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

export { transformOut, transformIn }
