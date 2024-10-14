import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface Data {
  id: string
  text: string
}

const transformOut =
  (patientId: string, QuickNoteSectionName: QuickNoteSectionName) =>
  (data: Data[]): QuickNoteSectionItem[] => {
    return data.map(({ id, text }) => ({
      pid: Number(patientId),
      sectionName: QuickNoteSectionName,
      sectionItem: id,
      sectionItemValue: text,
    }))
  }

export { transformOut }
