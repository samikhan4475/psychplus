import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformInHelper, transformOutHelper } from '../therapyUtils'
import {
  FamilyTherapySchemaType,
  TherapySessionParticipantsEnum,
} from './therapy-schema'

export const transformOut =
  (
    patientId: string,
    appointmentId: string,
    visitType: string,
    visitSequence: string,
  ) =>
  async (schema: FamilyTherapySchemaType): Promise<QuickNoteSectionItem[]> => {
    const defaultPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
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
): FamilyTherapySchemaType => {
  const defaultSchema: FamilyTherapySchemaType = {
    therapyTimeSpent: 'timeRangeOne',
    timeRangeOne: '40',
    therapySessionParticipants:
      TherapySessionParticipantsEnum.Values.FamilyWithOutPatientPresent,
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail:
      'Provider observed ongoing distortions within the couples/family unit, indicating a strong projection of misplaced feelings among one another.  Provider engaged in further exploration with the family to gain insight regarding their family unit’s ongoing relationships and reactions, to include maladaptive beliefs, behaviors and assumptions that may be associated with their unrealistic expectations for one another.  The provider encouraged clear and concise communication among all members present to facilitate a better understanding and expectation for one another.  Continued exploration of irrational beliefs, thoughts and behaviors is recommended to further analyze and process all types and directions of transference present within the family system. ',
  }

  return transformInHelper(value, defaultSchema)
}
