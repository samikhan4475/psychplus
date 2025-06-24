import { Appointment, QuickNoteSectionItem, VisitSequenceTypes } from '@/types'
import { transformIn as hpiTransformIn } from '@/ui/hpi/hpi-widget/data'
import { transformIn as mseTransformIn } from '@/ui/mse/mse-widget/data'
import { validateYesNoEnum } from '@/ui/mse/mse-widget/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface WidgetContainerCheckboxState {
  widgetId?: string
  visitType: string | null
  visitSequence: string | null
  initialValue?: string
  providerType?: string
  appointment?: Appointment
  mseData?: QuickNoteSectionItem[]
  hpiData?: QuickNoteSectionItem[]
}

const disabledHistoriesWidgetsVisitTypesBySequenceNew = [
  'Outpatient',
  'ResidentCare',
  'TransitionalCare',
  'IndividualPsychotherapy',
  'FamilyPsychotherapy',
]

const disabledHistoriesWidgetsVisitTypes = [
  'HospitalCare/Initial',
  'HospitalCare/InitialDischarge',
  'PhpCare/InitialDischarge',
  'PhpCare/Initial',
  'NursingHomeCare/InitialDischarge',
  'NursingHomeCare/Initial',
]

const historiesWidgetsIds = [
  QuickNoteSectionName.QuickNoteSectionPastPsychHx,
  QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
  QuickNoteSectionName.QuickNoteSectionSocialHx,
  QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
  QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
]

const examWidgetsIds = [
  QuickNoteSectionName.QuicknoteSectionMse,
  QuickNoteSectionName.QuicknoteSectionPhysicalExam,
]

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

const isHistoriesWidgetDisabled = (
  visitType: string | null,
  visitSequence: string | null,
): boolean => {
  const combinedType = `${visitType}/${visitSequence}`
  return (
    disabledHistoriesWidgetsVisitTypes.includes(combinedType) ||
    (visitSequence === 'New' &&
      disabledHistoriesWidgetsVisitTypesBySequenceNew.includes(visitType || ''))
  )
}

export const getSafetyPlanningInterventionState = (
  widgetId: string | undefined,
  appointment: Appointment | undefined,
  mseData?: QuickNoteSectionItem[],
  hpiData?: QuickNoteSectionItem[],
): boolean => {
  if (
    !appointment ||
    widgetId !== QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention
  )
    return false

  const mseTransformedData = mseTransformIn(mseData ?? [])
  const hpiTransformedData = hpiTransformIn(hpiData ?? [])

  const isHPIReleventDataExist =
    hpiTransformedData?.schizophrenia?.includes('schSuicidalThoughts') ||
    hpiTransformedData?.schizophrenia?.includes('schHomicidalThoughts') ||
    hpiTransformedData?.bpd?.includes('bpdSelfHarm')

  const isMSEReleventDataExist =
    validateYesNoEnum(mseTransformedData.tchiYesNo) === 'yes' ||
    validateYesNoEnum(mseTransformedData.tcsiYesNo) === 'yes'

  if (appointment.isServiceTimeDependent)
    return isHPIReleventDataExist || isMSEReleventDataExist

  if (appointment.visitType === 'ED Visit') return true

  switch (appointment.visitSequence) {
    case VisitSequenceTypes.InitialDischarge:
    case VisitSequenceTypes.Discharge:
      return true
    case VisitSequenceTypes.Initial:
    case VisitSequenceTypes.Subsequent:
    default:
      return false
  }
}

const createWidgetContainerCheckboxState = ({
  widgetId,
  visitType,
  visitSequence,
  initialValue,
  providerType,
  appointment,
  mseData,
  hpiData,
}: WidgetContainerCheckboxState) => {
  const getWidgetState = (disabled: boolean, initialValue?: string) => {
    return {
      disabled,
      checked: disabled ? true : undefined,
      actualNoteViewVisibility: disabled ? true : initialValue === 'show',
    }
  }

  const historiesState = getWidgetState(
    isHistoriesWidgetDisabled(visitType, visitSequence),
    initialValue,
  )

  const physicalExamState = getWidgetState(
    ![ProviderType.Psychiatry, ProviderType.Therapy].includes(
      providerType as ProviderType,
    ),
    initialValue,
  )

  const mseState = getWidgetState(
    [ProviderType.Psychiatry, ProviderType.Therapy].includes(
      providerType as ProviderType,
    ),
    initialValue,
  )

  const safetyPlanningInterventionState = getSafetyPlanningInterventionState(
    widgetId,
    appointment,
    mseData,
    hpiData,
  )

  return [
    {
      id: QuickNoteSectionName.QuicknoteSectionMse,
      ...mseState,
    },
    {
      id: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
      ...physicalExamState,
    },
    {
      id: QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention,
      disabled: safetyPlanningInterventionState,
      checked: safetyPlanningInterventionState || initialValue === 'show',
      actualNoteViewVisibility:
        safetyPlanningInterventionState || initialValue === 'show',
    },
    ...historiesWidgetsIds.map((id) => ({ id, ...historiesState })),
  ]
}

const getWidgetContainerCheckboxStateByWidgetId = ({
  widgetId,
  visitType,
  visitSequence,
  initialValue,
  providerType,
  appointment,
  mseData,
  hpiData,
}: WidgetContainerCheckboxState) => {
  return createWidgetContainerCheckboxState({
    widgetId,
    visitType,
    visitSequence,
    initialValue,
    providerType,
    appointment,
    mseData,
    hpiData,
  }).find((item) => item.id === widgetId)
}

export { getWidgetContainerCheckboxStateByWidgetId }
