import { cache } from 'react'
import { VisitTypeEnum } from '@/enum'
import { QuickNoteSectionItem } from '@/types'
import { HpiWidgetClientLoader } from '@/ui/hpi/hpi-widget/hpi-widget-client-loader'
import { isHospitalCareVisit, visitTypeToWidgets } from '@/utils'
import { AddOnClientLoader } from '../add-on/add-on-widget/add-on-client-loader'
import { PatientAllergiesClientView } from '../allergy/patient-allergies-client-view'
import { FamilyInternalMedicineAssessmentPlanClientLoader } from '../assessment-plan/family-internal-medicine-assessment-plan-tab/family-internal-medicine-assessment-plan-client-loader'
import { PsychiatryAssessmentPlanClientLoader } from '../assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-client-loader'
import { TcmWidgetClientLoader } from '../assessment-plan/tcm-widget/tcm-widget-client-loader'
import { TherapyAssessmentPlanClientLoader } from '../assessment-plan/therapy-assessment-plan-tab/therapy-assessment-plan-client-loader'
import { CodesWidgetClientLoader } from '../codes/codes-widget/codes-widget-client-loader'
import { DiagnosisWidgetClientLoader } from '../diagnosis/diagnosis-widget/diagnosis-client-loader'
import { FamilyPsychHxClientLoader } from '../family-psych-hx/family-psych-hx-widget/family-psych-hx-client-loader'
import { FollowUpWidgetLoader } from '../follow-up/follow-up-widget-client-loader'
import { HospitalDischargeClientLoader } from '../hospital/hospital-discharge-widget/hospital-discharge-client-loader'
import { HospitalInitialClientLoader } from '../hospital/hospital-initial-widget/hospital-initial-client-loader'
import { PatientMedicationsClientLoader } from '../medications/patient-medications-client-loader'
import { MseWidgetClientLoader } from '../mse/mse-widget/mse-widget-client-loader'
import { PastMedicalHxClientLoader } from '../past-medical-hx/past-medical-hx-widget/past-medical-hx-client-loader'
import { PastPsychHxClientLoader } from '../past-psych-hx/past-psych-hx-widget/past-psych-hx-client-loader'
import { PhysicalExamWidgetClientLoader } from '../physical-exam/physical-exam-widget/physical-exam-widget-client-loader'
import { EctWidgetClientLoader } from '../procedures/ect-tab/ect-widget-client-loader'
import { SpravatoWidgetClientLoader } from '../procedures/spravato-tab/spravato-widget-client-loader'
import { TmsWidgetClientLoader } from '../procedures/tms-tab/tms-widget-client-loader'
import { QuestionnairesWidget } from '../questionnaires'
import { PatientReferralsWidget } from '../referrals'
import { RosWidgetClientLoader } from '../ros/ros-widget/ros-widget-client-loader'
import { SocialHxClientLoader } from '../social-hx/social-hx-widget/social-hx-client-loader'
import { SubstanceUseHxClientLoader } from '../substance-use-hx/substance-use-hx-widget/substance-use-hx-client-loader'
import { TherapyWidgetClientLoader } from '../therapy/therapy-widget-client-loader'
import { UploadedDocumentsClientWidget } from '../uploaded-documents/uploaded-documents-client-widget'
import { VitalsWidgetLoader } from '../vitals/vitals-widget-client-loader'
import { AddOnClientView } from './actual-note-view/add-on/add-on-client-view'
import { CodesDetailsClientView } from './actual-note-view/codes/codes-details-client-view'
import { EctDetailClientView } from './actual-note-view/ect/ect-detail-client-view'
import { FamilyInternalMedicineAssessmentPlanClientView } from './actual-note-view/family-internal-medicine-assessment-plan/family-internal-medicine-assessment-plan-client-view'
import { FamilyPsychDetailClientView } from './actual-note-view/family-psych-hx/family-psych-detail-client-view'
import { FollowUpClient } from './actual-note-view/follow-up/follow-up-client-view'
import { HospitalDischargeClientView } from './actual-note-view/hospital-discharge/hospital-discharge-client-view'
import { HospitalInitialClientView } from './actual-note-view/hospital-initial/hospital-initial-client-view'
import { HpiDetailClientView } from './actual-note-view/hpi/hpi-detail-client-view'
import { MedicationsClientView } from './actual-note-view/medications/medications-client-view'
import { MentalStatusExamClientView } from './actual-note-view/mental-status-exam/mental-status-exam-client-view'
import { PastMedicalHxClientView } from './actual-note-view/past-medical-hx/past-medical-hx-client-view'
import { PastPsychlDetailClientView } from './actual-note-view/past-psych-hx/past-psych-detail-client-view'
import { AllergiesDetailsClientView } from './actual-note-view/patient-allergies/allergies-details-client-view'
import { PhysicalExamClientView } from './actual-note-view/physical-exam/physical-exam-client-view'
import { PsychiatryAssessmentPlanClientView } from './actual-note-view/psychiatry-assessment-plan/psychiatry-assessment-plan-client-view'
import { QuestionnairesActualnoteView as QuestionnairesClientView } from './actual-note-view/questionnaires'
import { ReferralsClientView } from './actual-note-view/referrals/referrals-client-view'
import { ReviewOfSystemClientView } from './actual-note-view/ros/ros-client-view'
import { SocialHxDetailClientView } from './actual-note-view/social-hx/social-hx-detail-client-view'
import { SpravatoDetailClientView } from './actual-note-view/spravato/spravato-detail-client-view'
import { SubstanceUseHxClientView } from './actual-note-view/substance-use-hx/substance-use-hx-client-view'
import { TcmClientiew } from './actual-note-view/tcm/tcm-client-view'
import { TherapyAssessmentPlanClientView } from './actual-note-view/therapy-assessment-plan/therapy-assessment-plan-client-view'
import { TherapyClientView } from './actual-note-view/therapy/therapy-client-view'
import { TmsDetailClientView } from './actual-note-view/tms/tms-detail-client-view'
import { UploadedDocumentClientView } from './actual-note-view/uploaded-documents/uploaded-document-client-view'
import { VitalsNoteClientView } from './actual-note-view/vitals/vitals-note-client-view'
import { WorkingDiagnosisClientView } from './actual-note-view/working-diagnosis/working-diagnosis-client-view '
import { QuickNoteSectionName } from './constants'
import { WidgetType } from './types'

enum ProviderType {
  Psychiatry = 'Psychiatrist',
  Therapy = 'Therapy',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

const widgets: Array<WidgetType> = [
  {
    component: UploadedDocumentsClientWidget,
    id: QuickNoteSectionName.QuicknoteSectionUploadedDocuments,
    actualNoteComponent: UploadedDocumentClientView,
  },
  {
    component: HpiWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionHPI,
    actualNoteComponent: HpiDetailClientView,
  },
  {
    component: PastPsychHxClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    actualNoteComponent: PastPsychlDetailClientView,
  },
  {
    component: FamilyPsychHxClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    actualNoteComponent: FamilyPsychDetailClientView,
  },
  {
    component: SocialHxClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionSocialHx,
    actualNoteComponent: SocialHxDetailClientView,
  },
  {
    component: SubstanceUseHxClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
    actualNoteComponent: SubstanceUseHxClientView,
  },
  {
    component: DiagnosisWidgetClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionDiagnosis,
    actualNoteComponent: WorkingDiagnosisClientView,
  },
  {
    component: AddOnClientLoader,
    id: QuickNoteSectionName.Addon,
    actualNoteComponent: AddOnClientView,
    isPatientAndAppointmentDependent: true,
  },
  {
    component: PastMedicalHxClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    actualNoteComponent: PastMedicalHxClientView,
  },
  {
    component: PatientAllergiesClientView,
    id: QuickNoteSectionName.QuicknoteSectionPatientAllergies,
    actualNoteComponent: AllergiesDetailsClientView,
    isClient: true,
  },
  {
    component: QuestionnairesWidget,
    id: QuickNoteSectionName.QuicknoteSectionQuestionnaires,
    actualNoteComponent: QuestionnairesClientView,
    isClient: true,
  },
  {
    component: RosWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
    actualNoteComponent: ReviewOfSystemClientView,
  },
  {
    component: VitalsWidgetLoader,
    id: QuickNoteSectionName.Vitals,
    actualNoteComponent: VitalsNoteClientView,
  },
  {
    component: PhysicalExamWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
    actualNoteComponent: PhysicalExamClientView,
  },
  {
    component: MseWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionMse,
    actualNoteComponent: MentalStatusExamClientView,
  },
  {
    component: PatientMedicationsClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionMedications,
    actualNoteComponent: MedicationsClientView,
    isClient: true,
  },
  {
    component: PatientReferralsWidget,
    id: QuickNoteSectionName.QuicknoteSectionReferrals,
    actualNoteComponent: ReferralsClientView,
    isClient: true,
  },
  {
    component: FollowUpWidgetLoader,
    id: QuickNoteSectionName.FollowUps,
    actualNoteComponent: FollowUpClient,
    isClient: true,
  },
  {
    component: TherapyWidgetClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionIndividualTherapy,
    actualNoteComponent: TherapyClientView,
  },
  {
    component: TherapyWidgetClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionFamilyTherapy,
    actualNoteComponent: TherapyClientView,
  },
  {
    component: EctWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionProcedureEtcTab,
    actualNoteComponent: EctDetailClientView,
  },
  {
    component: TmsWidgetClientLoader,
    id: QuickNoteSectionName.ProcedureTMS,
    actualNoteComponent: TmsDetailClientView,
  },
  {
    component: TherapyAssessmentPlanClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    actualNoteComponent: TherapyAssessmentPlanClientView,
    providerTypes: [ProviderType.Therapy],
  },
  {
    component: PsychiatryAssessmentPlanClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    actualNoteComponent: PsychiatryAssessmentPlanClientView,
    providerTypes: [ProviderType.Psychiatry],
  },
  {
    component: FamilyInternalMedicineAssessmentPlanClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    actualNoteComponent: FamilyInternalMedicineAssessmentPlanClientView,
    providerTypes: [ProviderType.InternalMedicine, ProviderType.FamilyMedicine],
  },
  {
    component: SpravatoWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionProcedureSpravato,
    actualNoteComponent: SpravatoDetailClientView,
    isPatientAndAppointmentDependent: true,
  },
  {
    component: HospitalDischargeClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionHospitalDischarge,
    actualNoteComponent: HospitalDischargeClientView,
  },
  {
    component: HospitalInitialClientLoader,
    id: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
    actualNoteComponent: HospitalInitialClientView,
  },
  {
    component: TcmWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionTcm,
    actualNoteComponent: TcmClientiew,
  },
  {
    component: CodesWidgetClientLoader,
    id: QuickNoteSectionName.QuicknoteSectionCodes,
    actualNoteComponent: CodesDetailsClientView,
    isPatientAndAppointmentDependent: true,
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

  const widgetIds = visitTypeToWidgets[visitType as VisitTypeEnum]

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

const getWidgetIds = ({
  widgets,
  isPatientAndAppointmentDependent,
}: {
  widgets: WidgetType[]
  isPatientAndAppointmentDependent?: boolean
}) => [
  ...new Set(
    widgets.reduce((acc, el) => {
      if (
        !el.isClient &&
        el.isPatientAndAppointmentDependent === isPatientAndAppointmentDependent
      ) {
        const uniqueItems = [el.id, ...(el.sectionNames ?? [])]
        acc.push(...uniqueItems)
      }
      return acc
    }, [] as string[]),
  ),
]

const modifyWidgetResponse = (data: QuickNoteSectionItem[] = []) =>
  data.reduce<Record<string, QuickNoteSectionItem[]>>((acc, item) => {
    const key = item.sectionName
    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})

const getCachedWidgetsByVisitType = cache(getWidgetsByVisitType)

const widgetErrorsMap = {
  Addon: 'Add-on.',
  Spravato: 'Spravato.',
  ECT: 'ECT.',
  TMS: 'TMS.',
  HPI: 'HPI.',
  PastPsychHx: 'Past Psych History.',
  ReviewOfSystem: 'Review of System.',
  Mse: 'Mental Status Exam.',
  PsychiatryAssessmentPlan: 'Psychiatry Assessment/Plan.',
  Vital: 'Vitals.',
  HospitalInitial: 'Hospital Initial.',
  HospitalOrders: 'Hospital Orders.',
  FamilyPsychHx: 'Family Psychiatry History.',
  IndividualTherapy: 'Individual Therapy.',
  FamilyTherapy: 'Family Therapy.',
  PastMedicalHx: 'Past Medical History.',
  SocialHx: 'Social History.',
  SubstanceUseHx: 'Substance Use History.',
  PhysicalExam: 'Physical Exam.',
  TherapyAssessmentPlan: 'Therapy Assessment/Plan.',
  FamilyInternalMedicineAssessmentPlan:
    'Family Internal Medicine Assessment/Plan.',
  PatientAllergies: 'Patient Allergies.',
  AssessmentPlan: 'Assessment Plan.',
  FollowUps: 'Follow Ups.',
  HospitalDischarge: 'Hospital Discharge.',
  AdmittingDiagnosis: 'Admitting Diagnosis.',
  WorkingDischargeDiagnosis: 'Working Discharge Diagnosis.',
}

const getWidgetErrorDetails = (
  errorKey: string | undefined,
  widgetError: string,
) => {
  const errors = widgetError
    ?.split(',')
    ?.map(
      (item) =>
        widgetErrorsMap?.[item?.trim() as keyof typeof widgetErrorsMap] ??
        item?.trim(),
    )
  return [
    widgetErrorsMap?.[errorKey as keyof typeof widgetErrorsMap],
    ...errors,
  ].filter(Boolean)
}

export {
  getCachedWidgetsByVisitType,
  getWidgetIds,
  modifyWidgetResponse,
  getWidgetsByVisitType,
  getWidgetErrorDetails,
}
