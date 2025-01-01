import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { CodesWidgetItem, QuickNoteSectionItem, SharedCode } from '@/types'
import {
  transformInAppointmentCodes,
  transformOut,
} from '@/ui/codes/codes-widget/data'
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
    codesData[key].push(code)
  })

  return transformOut(patientId, appointmentId)(codesData)
}

const fetchCodes = async (patientId: string, appointmentId?: string) => {
  const [codesResult, appointmentCodeResult] = await Promise.all([
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      undefined,
      true,
    ),

    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      appointmentId,
      false,
    ),
  ])

  if (
    codesResult.state === 'error' ||
    appointmentCodeResult.state === 'error'
  ) {
    throw new Error('Something went wrong. Please try again.')
  }

  return transformInAppointmentCodes(
    codesResult.data,
    appointmentCodeResult.data,
  )
}

const getCodesetDisplayName = (value: string, codes: SharedCode[]): string =>
  codes.find((code) => code.value === value)?.display ?? ''

export { manageCodes, getCodesetDisplayName }
