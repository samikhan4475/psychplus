import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { BLOCK_OPTIONS as FAMILY_BLOCK_OPTIONS } from '@/ui/therapy/therapy-widget/family/blocks/time-spent'
import { FAMILY_SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/family/blocks/utils'
import { transformIn as familyTransformIn } from '@/ui/therapy/therapy-widget/family/data'
import { FamilyTherapySchemaType } from '@/ui/therapy/therapy-widget/family/therapy-schema'
import { BLOCK_OPTIONS as INDIVIDUAL_BLOCK_OPTIONS } from '@/ui/therapy/therapy-widget/individual/blocks/time-spent'
import { SESSION_PARTICIPANT_OPTIONS } from '@/ui/therapy/therapy-widget/individual/blocks/utils'
import { transformIn } from '@/ui/therapy/therapy-widget/individual/data'
import { TherapySchemaType } from '@/ui/therapy/therapy-widget/individual/therapy-schema'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TherapyProps = {
  patientId: string
  visitType: string
}

const fetchTherapyData = async (
  patientId: string,
  visitType: string,
): Promise<{
  values: TherapySchemaType | FamilyTherapySchemaType
  blockOptions: typeof INDIVIDUAL_BLOCK_OPTIONS | typeof FAMILY_BLOCK_OPTIONS
  sessionParticipantOptions:
    | typeof SESSION_PARTICIPANT_OPTIONS
    | typeof FAMILY_SESSION_PARTICIPANT_OPTIONS
}> => {
  try {
    if (visitType === 'IndividualPsychotherapy') {
      const response = await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
      ])
      if (response.state === 'error') throw new Error('Error fetching data')
      return {
        values: transformIn(response.data),
        blockOptions: INDIVIDUAL_BLOCK_OPTIONS,
        sessionParticipantOptions: SESSION_PARTICIPANT_OPTIONS,
      }
    } else if (visitType === 'FamilyPsychotherapy') {
      const response = await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
      ])
      if (response.state === 'error') throw new Error('Error fetching data')
      return {
        values: familyTransformIn(response.data),
        blockOptions: FAMILY_BLOCK_OPTIONS,
        sessionParticipantOptions: FAMILY_SESSION_PARTICIPANT_OPTIONS,
      }
    } else {
      throw new Error('Invalid visitType')
    }
  } catch (error) {
    console.error('Error fetching therapy data:', error)
    throw error
  }
}

const Therapy = async ({ patientId, visitType }: TherapyProps) => {
  try {
    const { values, blockOptions, sessionParticipantOptions } =
      await fetchTherapyData(patientId, visitType)

    const paragraph = `Spent ${
      values[values.therapyTimeSpent as keyof typeof values]
        ? `${values[values.therapyTimeSpent as keyof typeof values]} minutes`
        : blockOptions.find(
            (option) => option.value === values.therapyTimeSpent,
          )?.label || 'Unknown time'
    } on this session interacting with ${
      values.therapySessionParticipants === 'Patient&Other' &&
      values.patientOther
        ? `Patient & ${values.patientOther}`
        : sessionParticipantOptions.find(
            (option) => option.value === values.therapySessionParticipants,
          )?.label || 'Unknown participants'
    }. Therapy modalities that were used include but are not limited to ${values.therapyDetailsModality
      .map((modality) => modality.display)
      .join(
        ', ',
      )}. Interventions that were completed include but are not limited to ${values.therapyDetailsInterventions
      .map((intervention) => intervention.display)
      .join(', ')}.`

    const paragraphHeading =
      visitType === 'IndividualPsychotherapy'
        ? 'Individual Therapy'
        : 'Family/Couple Therapy'

    return (
      <ActualNoteDetailsWrapper
        sectionName={
          visitType === 'IndividualPsychotherapy'
            ? QuickNoteSectionName.QuickNoteSectionIndividualTherapy
            : QuickNoteSectionName.QuickNoteSectionFamilyTherapy
        }
      >
        <Details paragraphHeading={paragraphHeading} paragraph={paragraph} />
      </ActualNoteDetailsWrapper>
    )
  } catch (error) {
    return <Text>Error loading therapy data. Please try again later.</Text>
  }
}

export { Therapy }
