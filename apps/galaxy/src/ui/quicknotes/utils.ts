import { cache } from 'react'
import { AddOnWidget } from '@/ui/add-on'
import { PatientAllergiesView } from '@/ui/allergy'
import { FamilyInternalMedicineAssessmentPlanWidget } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/family-internal-medicine-assessment-plan-widget'
import { PsychiatryAssessmentPlanWidget } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-widget'
import { TherapyAssessmentPlanWidget } from '@/ui/assessment-plan/therapy-assessment-plan-tab/therapy-assessment-plan-widget'
import { CodesWidget } from '@/ui/codes'
import { DiagnosisWidget } from '@/ui/diagnosis/diagnosis-widget'
import { FamilyPsychHxWidget } from '@/ui/family-psych-hx'
import { QuicknotesFollowUpWidget } from '@/ui/follow-up'
import { HpiWidget } from '@/ui/hpi'
import { PatientMedicationsView } from '@/ui/medications'
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
import { isHospitalCareVisit, visitTypeToWidgets } from '@/utils'
import { TcmWidget } from '../assessment-plan/tcm-widget'
import { HospitalDischargeWidget } from '../hospital/hospital-discharge-widget'
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
  MedicationsDetailsView,
  MentalStatusExam,
  PastMedicalHx,
  PastPsychlDetailView,
  PhysicalExamView,
  PsychiatryAssessmentPlanView,
  QuestionnairesActualnoteView,
  ReferralsDetailsView,
  ReviewOfSystem,
  SocialHxDetailView,
  SpravatoDetailView,
  SubstanceUseHx,
  Therapy,
  TherapyAssessmentPlanView,
  TmsDetailView,
  VitalsView,
  WorkingDiagnosisDetailView,
} from './actual-note-view'
import { AddOnView } from './actual-note-view/add-on'
import { HospitalDischargeView } from './actual-note-view/hospital-discharge'
import { HospitalInitialView } from './actual-note-view/hospital-initial'
import { TcmView } from './actual-note-view/tcm'
import { QuickNoteSectionName } from './constants'
import { WidgetType } from './types'
import { UploadedDocumentsWidget } from '../uploaded-documents/uploaded-documents-widget'

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

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
    component: PastMedicalHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    actualNoteComponent: PastMedicalHx,
  },
  {
    component: FamilyPsychHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    actualNoteComponent: FamilyPsychDetailView,
  },
  {
    component: SocialHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionSocialHx,
    actualNoteComponent: SocialHxDetailView,
  },
  {
    component: SubstanceUseHxWidget,
    id: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    actualNoteComponent: SubstanceUseHx,
  },
  {
    component: PatientAllergiesView,
    id: QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    actualNoteComponent: AllergiesDetailsView,
  },
  {
    component: QuestionnairesWidget,
    id: QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    actualNoteComponent: QuestionnairesActualnoteView,
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
    component: DiagnosisWidget,
    id: QuickNoteSectionName.QuickNoteSectionDiagnosis,
    actualNoteComponent: WorkingDiagnosisDetailView,
  },
  {
    component: AddOnWidget,
    id: QuickNoteSectionName.Addon,
    actualNoteComponent: AddOnView,
  },
  {
    component: PatientMedicationsView,
    id: QuickNoteSectionName.QuicknoteSectionMedications,
    actualNoteComponent: MedicationsDetailsView,
  },
  {
    component: PatientReferralsWidget,
    id: QuickNoteSectionName.QuicknoteSectionReferrals,
    actualNoteComponent: ReferralsDetailsView,
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
    id: QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
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
    providerTypes: [ProviderType.Therapy],
  },
  {
    component: PsychiatryAssessmentPlanWidget,
    id: QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    actualNoteComponent: PsychiatryAssessmentPlanView,
    providerTypes: [ProviderType.Psychiatry],
  },
  {
    component: UploadedDocumentsWidget,
    id: QuickNoteSectionName.QuicknoteSectionUploadedDocuments,
  },
  {
    component: FamilyInternalMedicineAssessmentPlanWidget,
    id: QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    actualNoteComponent: FamilyInternalMedicineAssessmentPlanView,
    providerTypes: [ProviderType.InternalMedicine, ProviderType.FamilyMedicine],
  },
  {
    component: SpravatoWidget,
    id: QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
    actualNoteComponent: SpravatoDetailView,
  },
  {
    component: HospitalDischargeWidget,
    id: QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
    actualNoteComponent: HospitalDischargeView,
  },
  {
    component: HospitalInitialWidget,
    id: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    actualNoteComponent: HospitalInitialView,
  },
  {
    component: TcmWidget,
    id: QuickNoteSectionName.QuicknoteSectionTcm,
    actualNoteComponent: TcmView,
  },
]

const getWidgetsByVisitType = (
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
    const widget = widgets.find((widget) => widget.id === id)

    if (
      widget &&
      (!widget.providerTypes || widget.providerTypes.includes(providerType))
    ) {
      acc.push(widget)
    }

    return acc
  }, [] as typeof widgets)

  return widgetsForVisitType
}

const getCachedWidgetsByVisitType = cache(getWidgetsByVisitType)

export { getCachedWidgetsByVisitType }
