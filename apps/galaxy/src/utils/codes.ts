import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { CodesWidgetItem, QuickNoteSectionItem } from '@/types'
import { transformIn, transformOut } from '@/ui/codes/codes-widget/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const manageCodes = async (
  patientId: string,
  appointmentId: string,
  widgetAllCptCodes: CodesWidgetItem[],
  selectedCodes: CodesWidgetItem[],
): Promise<QuickNoteSectionItem[]> => {
  const codesData = await fetchCodes(patientId, appointmentId)
  widgetAllCptCodes.forEach(({ key, code }) => {
    codesData[key] = codesData[key].filter(
      (existingCode) => existingCode !== code,
    )
  })
  selectedCodes.forEach(({ key, code }) => {
    if (!codesData[key].includes(code)) {
      codesData[key].push(code)
    }
  })

  return transformOut(patientId, appointmentId)(codesData)
}

const fetchCodes = async (patientId: string, appointmentId?: string) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionCodes],
    appointmentId,
  )
  if (response?.state === 'error') {
    return {
      cptPrimaryCodes: [],
      cptAddonCodes: [],
      cptmodifierCodes: [],
    }
  }

  return (
    transformIn(response?.data) ?? {
      cptPrimaryCodes: [],
      cptAddonCodes: [],
      cptmodifierCodes: [],
    }
  )
}

export { manageCodes }
