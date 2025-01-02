import { CptCodeKeys, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { manageCodes } from '@/utils/codes'

const getCodes = async (
  patientId: string,
  appointmentId: string,
): Promise<QuickNoteSectionItem[]> => {
  const codesResult = await manageCodes(patientId, appointmentId, [], [])

  const list = codesResult.filter((code) => code.sectionItemValue === '96127')

  if (list.length === 2) {
    return codesResult
  } else if (list.length < 2) {
    codesResult.push({
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuicknoteSectionCodes,
      sectionItem: CptCodeKeys.ADD_ONS_KEY,
      sectionItemValue: '96127',
    })
  }

  return codesResult
}

export { getCodes }
