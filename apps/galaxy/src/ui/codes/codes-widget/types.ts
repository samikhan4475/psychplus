import { Appointment, QuickNoteHistory, QuickNoteSectionItem, SelectOptionType } from '@/types'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'

interface VisitProps {
  cptPrimaryCodes: SelectOptionType[]
  cptAddOnsCodes: SelectOptionType[]
  cptmodifierCodes: SelectOptionType[]
  appointment: Appointment
  patientId: string
  tcmData?: QuickNoteSectionItem[]
  isQuicknoteView?: boolean
}

interface CountQuestionnaireSectionsArgs {
  addedToNotes?: Record<string, string[]>
  histories?:Record<string, QuickNoteHistory[]> 
  excludeKey?: string
  substanceData?: SubstanceUseHxWidgetSchemaType
}

export type { VisitProps, CountQuestionnaireSectionsArgs }
