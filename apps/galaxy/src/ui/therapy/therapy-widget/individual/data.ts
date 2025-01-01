import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformInHelper, transformOutHelper } from '../therapyUtils'
import {
  TherapySchemaType,
  TherapySessionParticipantsEnum,
} from './therapy-schema'

export const transformOut =
  (
    patientId: string,
    appointmentId: string,
    visitType: string,
    visitSequence: string,
  ) =>
  async (schema: TherapySchemaType): Promise<QuickNoteSectionItem[]> => {
    const defaultPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
      appointmentId: Number(appointmentId),
    }

    return transformOutHelper(
      schema,
      patientId,
      appointmentId,
      visitType,
      visitSequence,
      defaultPayload,
    )
  }

export const transformIn = (
  value: QuickNoteSectionItem[],
): TherapySchemaType => {
  const defaultSchema: TherapySchemaType = {
    therapyTimeSpent: 'timeRangeOne',
    therapySessionParticipants:
      TherapySessionParticipantsEnum.Values.PatientsOnly,
    patientOther: '',
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail:
      'Patient presented with signs of transference, indicating a strong misplacement of feelings associated with unresolved past experiences.  Provider engaged in schema exploration with patient to gain insight regarding patient’s irrational thoughts and maladaptive behavior patterns. Provider encouraged patient to self-reflect to make connections between dysfunctional beliefs, behaviors, and assumptions that may have affected their perception. Continued exploration of irrational thoughts and behaviors is recommended to map all types and directions of transference.',
  }

  return transformInHelper(value, defaultSchema)
}
