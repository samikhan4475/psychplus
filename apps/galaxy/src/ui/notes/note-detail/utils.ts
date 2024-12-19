import { CodesNoteDetailsView } from '@/ui/quicknotes/actual-note-view/codes/codes-note-details-view'
import { EctNoteDetailView } from '@/ui/quicknotes/actual-note-view/ect/ect-note-detail-view'
import { FamilyInternalMedicineAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/family-internal-medicine-assessment-plan/family-internal-medicine-assessment-plan-note-detail-view'
import { FamilyPsychNoteDetailView } from '@/ui/quicknotes/actual-note-view/family-psych-hx/family-psych-note-detail-view'
import { FollowUpNoteDetailView } from '@/ui/quicknotes/actual-note-view/follow-up/follow-up-note-detail-view'
import { HospitalDischargeNoteDetailView } from '@/ui/quicknotes/actual-note-view/hospital-discharge/hospital-discharge-note-detail-view'
import { HospitalInitialNoteDetailView } from '@/ui/quicknotes/actual-note-view/hospital-initial/hospital-initial-note-detail-view'
import { HpiNoteDetailView } from '@/ui/quicknotes/actual-note-view/hpi/hpi-note-detail-view'
import { MentalStatusExamNoteDetailView } from '@/ui/quicknotes/actual-note-view/mental-status-exam/mental-status-exam-note-detail-view'
import { PastMedicalHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/past-medical-hx/past-medical-hx-note-detail-view'
import { PastPsychlNoteDetailView } from '@/ui/quicknotes/actual-note-view/past-psych-hx/past-psych-note-detail-view'
import { AllergiesNoteDetailsView } from '@/ui/quicknotes/actual-note-view/patient-allergies/allergies-note-details-view'
import { PhysicalExamNoteDetailView } from '@/ui/quicknotes/actual-note-view/physical-exam/physical-exam-note-detail-view'
import { PsychiatryAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/psychiatry-assessment-plan/psychiatry-assessment-plan-note-detail-view'
import { Question } from '@/ui/quicknotes/actual-note-view/question'
import { ReferralNoteDetailView } from '@/ui/quicknotes/actual-note-view/referrals/referrals-note-detail-view'
import { ReviewofSystemNoteDetailView } from '@/ui/quicknotes/actual-note-view/ros/ros-note-detail-view'
import { SocialHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/social-hx/social-hx-note-detail-view'
import { SpravatoNoteDetailView } from '@/ui/quicknotes/actual-note-view/spravato/spravato-note-detail-view'
import { SubstanceUseHxNoteDetailView } from '@/ui/quicknotes/actual-note-view/substance-use-hx/substance-use-hx-note-detail-view'
import { TcmNoteDetailView } from '@/ui/quicknotes/actual-note-view/tcm/tcm-note-detail-view'
import { TherapyAssessmentPlanNoteDetailView } from '@/ui/quicknotes/actual-note-view/therapy-assessment-plan/therapy-assessment-plan-note-detail-view'
import { TherapyNoteDetailView } from '@/ui/quicknotes/actual-note-view/therapy/therapy-note-detail-view'
import { TmsNoteDetailView } from '@/ui/quicknotes/actual-note-view/tms/tms-note-detail-view'
import { VitalsNoteDetailView } from '@/ui/quicknotes/actual-note-view/vitals/vitals-note-detail-view'
import { WorkingDiagnosisNoteDetailView } from '@/ui/quicknotes/actual-note-view/working-diagnosis/working-diagnosis-note-detail-view'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { isHospitalCareVisit, visitTypeToWidgets } from '@/utils'
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
    actualNoteDetailComponent: Question,
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
  // {
  //   id: QuickNoteSectionName.QuicknoteSectionMedications,
  //   actualNoteDetailComponent: MedicationsNoteDetailView,
  // },// TODO: will remove when MedicationsNoteDetailView will be done in actual note
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
    id: QuickNoteSectionName.QuickNoteSectionTherapy,
    actualNoteDetailComponent: TherapyNoteDetailView,
  },
  {
    id: QuickNoteSectionName.ProcedureECT,
    actualNoteDetailComponent: EctNoteDetailView,
  },
  {
    id: QuickNoteSectionName.ProcedureTMS,
    actualNoteDetailComponent: TmsNoteDetailView,
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
]

const getWidgetsArrayByVisitType = (
  visitType: string,
  visitSequence: string,
  providerType: string,
) => {
  if (isHospitalCareVisit(visitType)) {
    visitType = `${visitType}/${visitSequence}`
  }

  const widgetIds = visitTypeToWidgets[visitType]

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
