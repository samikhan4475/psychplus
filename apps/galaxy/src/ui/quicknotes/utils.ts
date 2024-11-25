import { cache } from 'react'
import { AddOnWidget } from '@/ui/add-on'
import { PatientAllergiesView, PatientAllergiesWidget } from '@/ui/allergy'
import { FamilyInternalMedicineAssessmentPlanWidget } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/family-internal-medicine-assessment-plan-widget'
import { PsychiatryAssessmentPlanWidget } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-widget'
import { TherapyAssessmentPlanWidget } from '@/ui/assessment-plan/therapy-assessment-plan-tab/therapy-assessment-plan-widget'
import { CodesWidget } from '@/ui/codes'
import { QuicknotesDiagnosisWidget } from '@/ui/diagnosis/quicknotes-diagnosis-widget'
import { FamilyPsychHxWidget } from '@/ui/family-psych-hx'
import { QuicknotesFollowUpWidget } from '@/ui/follow-up'
import { HpiWidget } from '@/ui/hpi'
import { PatientMedicationsWidget } from '@/ui/medications'
import { MseWidget } from '@/ui/mse'
import { PastMedicalHxWidget } from '@/ui/past-medical-hx'
import { PastPsychHxWidget } from '@/ui/past-psych-hx'
import { PhysicalExamWidget } from '@/ui/physical-exam'
import { EctWidgetLoader as EctWidget } from '@/ui/procedures/ect-tab/ect-widget-loader'
import { TmsWidgetLoader as TmsWidget } from '@/ui/procedures/tms-tab/tms-widget-loader'
import { QuestionnairesWidget } from '@/ui/questionnaires'
import { PatientReferralsWidget } from '@/ui/referrals'
import { RosWidget } from '@/ui/ros'
import { SocialHxWidget } from '@/ui/social-hx'
import { SubstanceUseHxWidget } from '@/ui/substance-use-hx'
import { TherapyWidget } from '@/ui/therapy'
import { QuicknotesVitalsWidget } from '@/ui/vitals'
import { isHospitalCareVisit } from '@/utils'
import { HospitalInitialWidget } from '../hospital/hospital-initial-widget'
import { SpravatoWidgetLoader as SpravatoWidget } from '../procedures/spravato-tab/spravato-widget-loader'
import {
  AllergiesDetailsView,
  CodesDetailsView,
  EctDetailView,
  FamilyInternalMedicineAssessmentPlanView,
  FamilyPsychDetailView,
  FollowUp,
  HpiDetailView,
  Medications,
  MentalStatusExam,
  PastMedicalHx,
  PastPsychlDetailView,
  PhysicalExamView,
  PsychiatryAssessmentPlanView,
  Question,
  Referral,
  ReviewOfSystem,
  SocialHx,
  SpravatoDetailView,
  SubstanceUseHx,
  Therapy,
  TherapyAssessmentPlanView,
  TmsDetailView,
  VitalsView,
  WorkingDiagnosisDetailView,
} from './actual-note-view'
import { HospitalInitialView } from './actual-note-view/hospital-initial'
import { QuickNoteSectionName } from './constants'
import { WidgetType } from './types'

const widgets: Array<WidgetType> = [
  {
    component: HpiWidget,
    id: QuickNoteSectionName.QuicknoteSectionHPI,
    actualNoteComponent: HpiDetailView,
  },
  {
    component: PastPsychHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    actualNoteComponent: PastPsychlDetailView,
  },
  {
    component: FamilyPsychHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    actualNoteComponent: FamilyPsychDetailView,
  },
  {
    component: SocialHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionSocialHx,
    actualNoteComponent: SocialHx,
  },
  {
    component: SubstanceUseHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    actualNoteComponent: SubstanceUseHx,
  },
  {
    component: PastMedicalHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    actualNoteComponent: PastMedicalHx,
  },
  {
    component: PatientAllergiesView,
    id: QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    actualNoteComponent: AllergiesDetailsView,
  },
  {
    component: QuestionnairesWidget,
    id: QuickNoteSectionName.AddToNoteQuestionnaire,
    actualNoteComponent: Question,
  },
  {
    component: RosWidget,
    id: QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    actualNoteComponent: ReviewOfSystem,
  },
  {
    component: QuicknotesVitalsWidget,
    id: QuickNoteSectionName.Vitals,
    actualNoteComponent: VitalsView,
  },
  {
    component: PhysicalExamWidget,
    id: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    actualNoteComponent: PhysicalExamView,
  },
  {
    component: MseWidget,
    id: QuickNoteSectionName.QuicknoteSectionMse,
    actualNoteComponent: MentalStatusExam,
  },
  {
    component: QuicknotesDiagnosisWidget,
    id: QuickNoteSectionName.QuickNoteSectionDiagnosis,
    actualNoteComponent: WorkingDiagnosisDetailView,
  },
  { component: AddOnWidget, id: QuickNoteSectionName.Addon },
  {
    component: PatientMedicationsWidget,
    id: QuickNoteSectionName.QuicknoteSectionMedications,
    actualNoteComponent: Medications,
  },
  {
    component: PatientReferralsWidget,
    id: QuickNoteSectionName.QuicknoteSectionReferrals,
    actualNoteComponent: Referral,
  },
  {
    component: QuicknotesFollowUpWidget,
    id: QuickNoteSectionName.FollowUps,
    actualNoteComponent: FollowUp,
  },
  {
    component: CodesWidget,
    id: QuickNoteSectionName.QuicknoteSectionCodes,
    actualNoteComponent: CodesDetailsView,
  },
  {
    component: TherapyWidget,
    id: QuickNoteSectionName.QuickNoteSectionTherapy,
    actualNoteComponent: Therapy,
  },
  {
    component: EctWidget,
    id: QuickNoteSectionName.ProcedureECT,
    actualNoteComponent: EctDetailView,
  },
  {
    component: TmsWidget,
    id: QuickNoteSectionName.ProcedureTMS,
    actualNoteComponent: TmsDetailView,
  },
  {
    component: TherapyAssessmentPlanWidget,
    id: QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    actualNoteComponent: TherapyAssessmentPlanView,
  },
  {
    component: PsychiatryAssessmentPlanWidget,
    id: QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    actualNoteComponent: PsychiatryAssessmentPlanView,
  },
  {
    component: FamilyInternalMedicineAssessmentPlanWidget,
    id: QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    actualNoteComponent: FamilyInternalMedicineAssessmentPlanView,
  },
  {
    component: SpravatoWidget,
    id: QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
    actualNoteComponent: SpravatoDetailView,
  },
  {
    component: HospitalInitialWidget,
    id: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    actualNoteComponent: HospitalInitialView,
  },
]

const visitTypeToWidgets: Record<string, QuickNoteSectionName[]> = {
  Outpatient: [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.AddToNoteQuestionnaire,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuicknoteSectionMedications,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ],
  EdVisit: [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.AddToNoteQuestionnaire,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuicknoteSectionMedications,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ],
  TransitionalCare: [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.AddToNoteQuestionnaire,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.ProcedureTMS,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuicknoteSectionMedications,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ],
  IndividualPsychotherapy: [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuickNoteSectionTherapy,
    QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ],
  FamilyPsychotherapy: [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuickNoteSectionTherapy,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ],
  ECTVisit: [
    QuickNoteSectionName.ProcedureECT,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
  TMSVisit: [QuickNoteSectionName.ProcedureTMS],
  SpravatoVisit: [
    QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
  'HospitalCare/Initial': [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
  'HospitalCare/Subsequent': [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
  'HospitalCare/Discharge': [
    QuickNoteSectionName.QuicknoteSectionAdmittingDiagnosis,
    QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
  'HospitalCare/Initial/Discharge': [
    QuickNoteSectionName.QuicknoteSectionHPI,
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    QuickNoteSectionName.Vitals,
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    QuickNoteSectionName.QuicknoteSectionMse,
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
    QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    QuickNoteSectionName.Addon,
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
    QuickNoteSectionName.QuicknoteSectionReferrals,
    QuickNoteSectionName.FollowUps,
    QuickNoteSectionName.QuicknoteSectionCodes,
  ],
}

const getWidgetsByVisitType = (visitType: string, visitSequence: string) => {
  if (isHospitalCareVisit(visitType)) {
    visitType = `${visitType}/${visitSequence}`
  }

  const widgetIds = visitTypeToWidgets[visitType]

  if (!widgetIds) {
    return []
  }

  const widgetsForVisitType = widgets.filter((widget) =>
    widgetIds.includes(widget.id),
  )

  return widgetsForVisitType
}

const getCachedWidgetsByVisitType = cache(getWidgetsByVisitType)

export { visitTypeToWidgets, getCachedWidgetsByVisitType }
