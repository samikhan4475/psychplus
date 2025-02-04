import { CptCodeKeys, QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { manageCodes } from '@/utils/codes'

const getCodes = async (
  patientId: string,
  appointmentId: string,
  updateCptCodes?: UpdateCptCodes,
): Promise<QuickNoteSectionItem[]> => {
  let codesResult: QuickNoteSectionItem[] = []
  if (updateCptCodes) {
    codesResult = await updateCptCodes(patientId, appointmentId, [], [])
  } else {
    codesResult = await manageCodes(patientId, appointmentId, [], [])
  }
  const list = codesResult.filter((code) => code.sectionItemValue === '96127')

  //Max 2 codes allowed
  if (list.length === 2) {
    return codesResult
  } else if (list.length < 2) {
    if (updateCptCodes) {
      await updateCptCodes(
        patientId,
        appointmentId,
        [],
        [{ key: CptCodeKeys.ADD_ONS_KEY, code: '96127' }],
      )
    }
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
