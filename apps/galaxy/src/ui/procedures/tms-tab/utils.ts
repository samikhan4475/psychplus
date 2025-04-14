import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const questionaireSections = [
  {
    title: `Today's PHQ-9`,
    sectionName: QuickNoteSectionName.QuickNoteSectionPhq9,
  },
  {
    title: `Today's Y-BOCS`,
    sectionName: QuickNoteSectionName.QuickNoteSectionYbcos,
  },
]

const calculateTotalScore = (data: QuickNoteSectionItem[]): number => {
  let totalScore = 0
  data.forEach((element: QuickNoteSectionItem) => {
    const value = Number(element.sectionItemValue) || 0
    totalScore += value
  })
  return totalScore
}

const getTMSSessionNumber = (appointment: Appointment | null | undefined) => {
  const tmsSessionNo = appointment?.tmsSessionNumbersCount ?? ''
  if (
    ['CancelledS', 'CancelledP', 'CancelledA', 'Rescheduled'].includes(
      appointment?.status ?? '',
    )
  )
    return ''
  return tmsSessionNo
}

export { questionaireSections, calculateTotalScore, getTMSSessionNumber }
