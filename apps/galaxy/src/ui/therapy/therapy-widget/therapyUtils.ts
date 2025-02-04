import {
  CodesWidgetItem,
  CptCodeKeys,
  QuickNoteSectionItem,
  UpdateCptCodes,
} from '@/types'
import { sanitizeFormData } from '@/utils'
import { manageCodes } from '@/utils/codes'
import { addOnCodes, getCptCodeMap } from './cpt-code-map'
import { FamilyTherapySchemaType } from './family/therapy-schema'
import { TherapySchemaType } from './individual/therapy-schema'

interface ModalityTransferenceData {
  value: string
  display: string
}

export const getCodes = (
  schema: Record<
    string,
    string | undefined | boolean | ModalityTransferenceData[]
  >,
  visitType: string,
  visitSequence: string,
): CodesWidgetItem[] => {
  const selectedCodes: CodesWidgetItem[] = []
  const cptCodeMap = getCptCodeMap(visitType, visitSequence)

  if (cptCodeMap === '90791') {
    selectedCodes.push({
      code: cptCodeMap,
      key: CptCodeKeys.PRIMARY_CODE_KEY,
    })
    return selectedCodes
  }

  Object.entries(cptCodeMap).forEach(([key, value]) => {
    const schemaKey = schema?.[key]
    const code =
      typeof value === 'object'
        ? value?.[schemaKey as keyof typeof value]
        : value
    if (typeof code === 'string' && schemaKey) {
      selectedCodes.push({
        code,
        key: CptCodeKeys.PRIMARY_CODE_KEY,
      })
    }
  })
  return selectedCodes
}

export const transformOutHelper = async (
  schema: FamilyTherapySchemaType | TherapySchemaType,
  patientId: string,
  appointmentId: string,
  visitType: string,
  visitSequence: string,
  defaultPayload: Partial<QuickNoteSectionItem>,
  updateCptCodes?: UpdateCptCodes,
): Promise<QuickNoteSectionItem[]> => {
  const result: QuickNoteSectionItem[] = []
  const data = sanitizeFormData(schema)

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const updatedData = (value as ModalityTransferenceData[]).map(
        (item: ModalityTransferenceData) => `${item.value} ${item.display}`,
      )

      result.push({
        ...defaultPayload,
        sectionItem: key,
        sectionItemValue: String(updatedData),
        pid: defaultPayload.pid ?? 0,
        sectionName: defaultPayload.sectionName ?? '',
      })
    } else {
      const sectionItemValue = value as string
      result.push({
        ...defaultPayload,
        sectionItem: key,
        sectionItemValue,
        pid: defaultPayload.pid ?? 0,
        sectionName: defaultPayload.sectionName ?? '',
      })
    }
  })

  const selectedCodes = getCodes(schema, visitType, visitSequence)

  if (updateCptCodes) {
    const updatedCodes =
      (await updateCptCodes?.(
        patientId,
        appointmentId,
        addOnCodes,
        selectedCodes,
      )) ?? []
    result.push(...updatedCodes)
  } else {
    result.push(
      ...(await manageCodes(
        patientId,
        appointmentId,
        addOnCodes,
        selectedCodes,
      )),
    )
  }

  return result
}

export const transformInHelper = <T>(
  value: QuickNoteSectionItem[],
  defaultSchema: T,
): T => {
  const result = { ...defaultSchema }

  value.forEach((item) => {
    const key = item.sectionItem as keyof T
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

      result[key] = modifiedData as T[typeof key]
    } else {
      result[key] = itemValue as T[typeof key]
    }
  })

  return result
}
