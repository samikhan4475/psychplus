import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { CodesWidgetItem, QuickNoteSectionItem } from '@/types'
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
      undefined,
      true,
    ),

    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      appointmentId,
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

export { manageCodes }
