import { CptCodeKeys, UpdateCptCodes } from '@/features/codes/types'
import { manageCodes } from '@/features/codes/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'

const getCodes = async (
  patientId: string,
  updateCptCodes?: UpdateCptCodes,
): Promise<NoteSectionItem[]> => {
  let codesResult: NoteSectionItem[] = []

  if (updateCptCodes) {
    codesResult = await updateCptCodes(patientId, [], [])
  } else {
    codesResult = await manageCodes(patientId, [], [])
  }
  const list = codesResult.filter((code) => code.sectionItemValue === '96127')

  //Max 2 codes allowed
  if (list.length === 2) {
    return codesResult
  } else if (list.length < 2) {
    if (updateCptCodes) {
      await updateCptCodes(
        patientId,
        [],
        [{ key: CptCodeKeys.ADD_ONS_KEY, code: '96127' }],
      )
    }
    codesResult.push({
      pid: Number(patientId),
      sectionName: NoteSectionName.NoteSectionCodes,
      sectionItem: CptCodeKeys.ADD_ONS_KEY,
      sectionItemValue: '96127',
    })
  }

  return codesResult
}

export { getCodes }
