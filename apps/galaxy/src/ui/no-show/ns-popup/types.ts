import { PropsWithChildren, ReactNode } from 'react'
import { Appointment } from '@/types'

type YesNo = 'yes' | 'no'

export interface NoShowFormData {
  patientContactedTwiceQ1?: YesNo
  patientRespondedQ2?: YesNo
  safetyConcernQ3?: YesNo
  welfareCheckDoneQ4?: YesNo
  patientResponseQ5?: YesNo
  patientEducatedQ6?: YesNo
  comments?: string
}

export interface NoShowPopUpParams {
  appointment: Appointment
  isOpenDialog: boolean
  setIsOpenDialog: (open: boolean) => void
}

export interface NoShowHeaderProps extends PropsWithChildren {
  title: string
  buttons?: ReactNode
  className?: string
}

export interface QuestionParams {
  question: string
  field: string
  options: { label: string; value: string }[]
  alert: string
  dependantField: string
  dependantValue: string
  errorValue: string
}

export interface NoShowQuestionaireParams {
  appointment: Appointment
}

export interface PatientInformationBlockProps {
  appointment: Appointment
}

export interface NoShowNoteParams {
  patientId?: number
  appointmentId?: number
  signedByUserId?: number
  noteTypeCode?: string
  noteTitleCode?: string
  signedDate?: string
  secondaryNoteCreationDateTimeByUser?: string
  encounterSignedNoteDetails?: any
}
