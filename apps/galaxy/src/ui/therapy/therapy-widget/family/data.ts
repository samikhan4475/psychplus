import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformInHelper, transformOutHelper } from '../therapyUtils'
import { FamilyTherapySchemaType } from './therapy-schema'

export const transformOut =
  (
    patientId: string,
    appointmentId: string,
    visitType: string,
    visitSequence: string,
  ) =>
  async (
    schema: FamilyTherapySchemaType,
    _isSubmitting?: boolean,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
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
      updateCptCodes,
    )
  }

export const transformIn = (
  value: QuickNoteSectionItem[],
): FamilyTherapySchemaType => {
  const defaultSchema: FamilyTherapySchemaType = {
    therapyTimeSpent: 'timeRangeOne',
    timeRangeOne: '40',
    therapySessionParticipants: '',
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail: '',
  }

  return transformInHelper(value, defaultSchema)
}
