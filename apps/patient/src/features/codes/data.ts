import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '../note/constants'
import { NoteSectionItem } from '../note/types'
import { CodesWidgetSchemaType } from './codes-schema'
import { CptCodeKeys } from './types'

const transformOut =
  (patientId: string) =>
  (schema: CodesWidgetSchemaType): NoteSectionItem[] => {
    const result: NoteSectionItem[] = []
    const pid = Number(patientId)

    Object.entries(sanitizeFormData(schema)).forEach(
      ([sectionItem, values]) => {
        if (!Array.isArray(values)) return

        values.forEach((value) => {
          const sectionItemObj: NoteSectionItem = {
            pid,
            sectionName: NoteSectionName.NoteSectionCodes,
            sectionItem,
            sectionItemValue: value,
          }
          result.push(sectionItemObj)
        })
      },
    )

    return result
  }

const transformIn = (value: NoteSectionItem[]): CodesWidgetSchemaType => {
  const result: CodesWidgetSchemaType = {
    cptAddonCodes: [],
  }
  value.forEach(({ sectionItem, sectionItemValue }) => {
    if (sectionItem === CptCodeKeys.ADD_ONS_KEY)
      result.cptAddonCodes.push(sectionItemValue)
  })

  return result
}

export { transformIn, transformOut }
