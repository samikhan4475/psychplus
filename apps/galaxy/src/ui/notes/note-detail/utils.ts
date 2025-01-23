import { AddOnDetailView } from '@/ui/quicknotes/actual-note-view/add-on/add-on-detail-view'
import { CodesNoteDetailsView } from '@/ui/quicknotes/actual-note-view/codes/codes-note-details-view'
import { EctNoteDetailView } from '@/ui/quicknotes/actual-note-view/ect/ect-note-detail-view'
import { FamilyInternalMedicineAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/family-internal-medicine-assessment-plan/family-internal-medicine-assessment-plan-note-detail-view'
import { FamilyPsychNoteDetailView } from '@/ui/quicknotes/actual-note-view/family-psych-hx/family-psych-note-detail-view'
import { FollowUpNoteDetailView } from '@/ui/quicknotes/actual-note-view/follow-up/follow-up-note-detail-view'
import { HospitalDischargeNoteDetailView } from '@/ui/quicknotes/actual-note-view/hospital-discharge/hospital-discharge-note-detail-view'
import { HospitalInitialNoteDetailView } from '@/ui/quicknotes/actual-note-view/hospital-initial/hospital-initial-note-detail-view'
import { HpiNoteDetailView } from '@/ui/quicknotes/actual-note-view/hpi/hpi-note-detail-view'
import { MedicationsNoteDetailsView } from '@/ui/quicknotes/actual-note-view/medications/medications-note-details-view'
import { MentalStatusExamNoteDetailView } from '@/ui/quicknotes/actual-note-view/mental-status-exam/mental-status-exam-note-detail-view'
import { PastMedicalHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/past-medical-hx/past-medical-hx-note-detail-view'
import { PastPsychlNoteDetailView } from '@/ui/quicknotes/actual-note-view/past-psych-hx/past-psych-note-detail-view'
import { AllergiesNoteDetailsView } from '@/ui/quicknotes/actual-note-view/patient-allergies/allergies-note-details-view'
import { PhysicalExamNoteDetailView } from '@/ui/quicknotes/actual-note-view/physical-exam/physical-exam-note-detail-view'
import { PsychiatryAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/psychiatry-assessment-plan/psychiatry-assessment-plan-note-detail-view'
import { QuestionnairesNoteDetailView } from '@/ui/quicknotes/actual-note-view/questionnaires'
import { ReferralNoteDetailView } from '@/ui/quicknotes/actual-note-view/referrals/referrals-note-detail-view'
import { ReviewofSystemNoteDetailView } from '@/ui/quicknotes/actual-note-view/ros/ros-note-detail-view'
import { SocialHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/social-hx/social-hx-note-detail-view'
import { SpravatoNoteDetailView } from '@/ui/quicknotes/actual-note-view/spravato/spravato-note-detail-view'
import { SubstanceUseHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/substance-use-hx/substance-use-hx-note-detail-view'
import { TcmNoteDetailView } from '@/ui/quicknotes/actual-note-view/tcm/tcm-note-detail-view'
import { TherapyAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/therapy-assessment-plan/therapy-assessment-plan-note-detail-view'
import { TherapyClientView } from '@/ui/quicknotes/actual-note-view/therapy/therapy-client-view'
import { TmsDetailClientView } from '@/ui/quicknotes/actual-note-view/tms/tms-detail-client-view'
import { VitalsNoteDetailView } from '@/ui/quicknotes/actual-note-view/vitals/vitals-note-detail-view'
import { WorkingDiagnosisNoteDetailView } from '@/ui/quicknotes/actual-note-view/working-diagnosis/working-diagnosis-note-detail-view'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { isHospitalCareVisit, VisitTypeEnum, visitTypeToWidgets } from '@/utils'
import { WidgetType } from '../types'

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

const widgetsArray: Array<WidgetType> = [
  {
    id: QuickNoteSectionName.QuicknoteSectionHPI,
    actualNoteDetailComponent: HpiNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    actualNoteDetailComponent: PastPsychlNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    actualNoteDetailComponent: FamilyPsychNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionSocialHx,
    actualNoteDetailComponent: SocialHxNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    actualNoteDetailComponent: SubstanceUseHxNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    actualNoteDetailComponent: PastMedicalHxNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    actualNoteDetailComponent: AllergiesNoteDetailsView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    actualNoteDetailComponent: QuestionnairesNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    actualNoteDetailComponent: ReviewofSystemNoteDetailView,
  },
  {
    id: QuickNoteSectionName.Vitals,
    actualNoteDetailComponent: VitalsNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    actualNoteDetailComponent: PhysicalExamNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionMse,
    actualNoteDetailComponent: MentalStatusExamNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionDiagnosis,
    actualNoteDetailComponent: WorkingDiagnosisNoteDetailView,
  },
  {
    id: QuickNoteSectionName.Addon,
    actualNoteDetailComponent: AddOnDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionMedications,
    actualNoteDetailComponent: MedicationsNoteDetailsView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionReferrals,
    actualNoteDetailComponent: ReferralNoteDetailView,
  },
  {
    id: QuickNoteSectionName.FollowUps,
    actualNoteDetailComponent: FollowUpNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionCodes,
    actualNoteDetailComponent: CodesNoteDetailsView,
  },

  {
    id: QuickNoteSectionName.QuicknoteSectionProcedureEtcTab,
    actualNoteDetailComponent: EctNoteDetailView,
  },
  {
    id: QuickNoteSectionName.ProcedureTMS,
    actualNoteDetailComponent: TmsDetailClientView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    actualNoteDetailComponent: TherapyAssessmentPlanNoteDetailView,
    providerTypes: [ProviderType.Therapy],
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    actualNoteDetailComponent: PsychiatryAssessmentPlanNoteDetailView,
    providerTypes: [ProviderType.Psychiatry],
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    actualNoteDetailComponent:
      FamilyInternalMedicineAssessmentPlanNoteDetailView,
    providerTypes: [ProviderType.InternalMedicine, ProviderType.FamilyMedicine],
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
    actualNoteDetailComponent: SpravatoNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
    actualNoteDetailComponent: HospitalDischargeNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    actualNoteDetailComponent: HospitalInitialNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuicknoteSectionTcm,
    actualNoteDetailComponent: TcmNoteDetailView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
    actualNoteDetailComponent: TherapyClientView,
  },
  {
    id: QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
    actualNoteDetailComponent: TherapyClientView,
  },
]

const getWidgetsArrayByVisitType = (
  visitType: string,
  visitSequence: string,
  providerType: string,
) => {
  if (isHospitalCareVisit(visitType)) {
    visitType = `${visitType}/${visitSequence}`
  }

  const widgetIds = visitTypeToWidgets[visitType as VisitTypeEnum]

  if (!widgetIds) {
    return []
  }

  const widgetsForVisitType = widgetIds.reduce((acc, id) => {
    const widget = widgetsArray.find((widget) => widget.id === id)

    if (
      widget &&
      (!widget.providerTypes || widget.providerTypes.includes(providerType))
    ) {
      acc.push(widget)
    }

    return acc
  }, [] as typeof widgetsArray)

  return widgetsForVisitType
}

export { getWidgetsArrayByVisitType }
