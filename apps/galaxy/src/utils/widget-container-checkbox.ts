import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface WidgetContainerCheckboxState {
  widgetId?: string
  visitType: string | null
  visitSequence: string | null
  initialValue?: string
  providerType?: string
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

const createWidgetContainerCheckboxState = ({
  visitType,
  visitSequence,
  initialValue,
  providerType,
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

  return [
    {
      id: QuickNoteSectionName.QuicknoteSectionMse,
      ...mseState,
    },
    {
      id: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
      ...physicalExamState,
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
}: WidgetContainerCheckboxState) => {
  return createWidgetContainerCheckboxState({
    visitType,
    visitSequence,
    initialValue,
    providerType,
  }).find((item) => item.id === widgetId)
}

export { getWidgetContainerCheckboxStateByWidgetId }
