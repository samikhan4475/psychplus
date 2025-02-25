import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformInHelper, transformOutHelper } from '../therapyUtils'
import { TherapySchemaType } from './therapy-schema'

export const transformOut =
  (
    patientId: string,
    appointmentId: string,
    visitType: string,
    visitSequence: string,
  ) =>
  async (
    schema: TherapySchemaType,
    _isSubmitting?: boolean,
    updateCptCodes?: UpdateCptCodes,
  ): Promise<QuickNoteSectionItem[]> => {
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
      updateCptCodes,
    )
  }

export const transformIn = (
  value: QuickNoteSectionItem[],
): TherapySchemaType => {
  const defaultSchema: TherapySchemaType = {
    therapyTimeSpent: '',
    therapySessionParticipants: 'PatientsOnly',
    patientOther: '',
    therapyDetailsModality: [],
    therapyDetailsInterventions: [],
    additionalTherapyDetail: '',
    timeRangeOne: '',
    timeRangeTwo: '',
    timeRangeThree: '',
  }

  return transformInHelper(value, defaultSchema)
}
