import { QuickNoteSectionItem } from '@/types'
import {
  getFirstSectionValue,
  isDiagnosisCodeExist,
  NON_INSURANCE_DIAGNOSIS_CODE_SET,
  QUESTIONNAIRE_DIAGNOSIS_CODE_SET,
} from '../diagnosis/diagnosis/utils'

enum QuickNoteSectionName {
  QuickNoteSectionDashboard = 'QuicknoteSectionDashboard',
  QuicknoteSectionQuestionnaire = 'QuicknoteSectionQuestionnaire',
  QuestionnaireActualNoteView = 'QuicknoteSectionQuestionnaireActualNoteView',
  AddToNoteQuestionnaire = 'AddToNoteQuestionnaire',
  QuickNoteSectionDast10 = 'QuicknoteSectionQuestionnaireDast10',
  QuickNoteSectionPsc17 = 'QuicknoteSectionQuestionnairePsc17',
  QuickNoteSectionGad7 = 'QuicknoteSectionQuestionnaireGad7',
  QuickNoteSectionPcl5 = 'QuicknoteSectionQuestionnairePcl5',
  QuickNoteSectionPhq9 = 'QuicknoteSectionQuestionnairePhq9',
  QuickNoteSectionSnapIV = 'QuicknoteSectionQuestionnaireSnapIV',
  QuickNoteSectionYbcos = 'QuicknoteSectionQuestionnaireYbocs',
  QuickNoteSectionAudit = 'QuicknoteSectionQuestionnaireAudit',
  QuickNoteSectionAims = 'QuicknoteSectionQuestionnaireAims',
  QuickNoteSectionHamD = 'QuicknoteSectionQuestionnaireHamD',
  QuickNoteSectionCssrs = 'QuicknoteSectionQuestionnaireCssrs',
  QuickNoteSectionMoca = 'QuicknoteSectionQuestionnaireMoca',
  QuickNoteSectionGqasc = 'QuicknoteSectionQuestionnaireGqasc',
  QuickNoteSectionDiagnosis = 'QuicknoteSectionDiagnosis',
  QuickNoteSectionHospitalInitial = 'QuicknoteSectionHospitalInitial',
  QuickNoteSectionHospitalOrders = 'QuicknoteSectionHospitalOrders',
  QuickNoteSectionFamilyPsychHx = 'QuicknoteSectionFamilyPsychHx',
  QuickNoteSectionPastPsychHx = 'QuicknoteSectionPastPsychHx',
  QuickNoteSectionIndividualTherapy = 'QuicknoteSectionIndividualTherapy',
  QuickNoteSectionFamilyTherapy = 'QuicknoteSectionFamilyTherapy',
  QuickNoteSectionPastMedicalHx = 'QuicknoteSectionPastMedicalHx',
  QuickNoteSectionSocialHx = 'QuicknoteSectionSocialHx',
  QuickNoteSectionSubstanceUseHx = 'QuicknoteSectionSubstanceUseHx',
  QuicknoteSectionPhysicalExam = 'QuicknoteSectionPhysicalExam',
  QuicknoteSectionReviewOfSystem = 'QuicknoteSectionReviewOfSystem',
  QuickNoteSectionPrimaryCode = 'QuicknoteSectionPrimaryCode',
  QuicknoteSectionProcedureEtcTab = 'QuicknoteSectionProcedureEtcTab',
  ProcedureTMS = 'ProcedureTMS',
  QuicknoteSectionProcedureSpravatoTab = 'QuicknoteSectionProcedureSpravatoTab',
  QuicknoteSectionProcedureSpravato = 'QuicknoteSectionProcedureSpravato',
  QuicknoteSectionHPI = 'QuicknoteSectionHPI',
  Addon = 'QuicknoteSectionAddOn',
  Vitals = 'QuicknoteSectionVital',
  QuicknoteSectionMse = 'QuicknoteSectionMse',
  FollowUps = 'FollowUps',
  QuicknoteSectionPsychiatryAssessmentPlan = 'QuicknoteSectionPsychiatryAssessmentPlan',
  QuicknoteSectionTherapyAssessmentPlan = 'QuicknoteSectionTherapyAssessmentPlan',
  QuicknoteSectionFamilyInternalMedicineAssessmentPlan = 'QuicknoteSectionFamilyInternalMedicineAssessmentPlan',
  QuicknoteSectionSafetyPlanningIntervention = 'QuicknoteSectionSafetyPlanningIntervention',
  QuicknoteSectionPatientAllergies = 'QuicknoteSectionPatientAllergies',
  QuicknoteSectionAssessmentPlan = 'QuicknoteSectionAssessmentPlan',
  QuicknoteSectionQuestionnaires = 'QuicknoteSectionQuestionnaires',
  QuicknoteSectionReferrals = 'QuicknoteSectionReferrals',
  QuicknoteSectionCodes = 'QuicknoteSectionCodes',
  QuicknoteSectionMedications = 'QuicknoteSectionMedications',
  QuicknoteSectionHospitalDischarge = 'QuicknoteSectionHospitalDischarge',
  QuicknoteSectionAdmittingDiagnosis = 'QuicknoteSectionAdmittingDiagnosis',
  QuicknoteSectionWorkingDischargeDiagnosis = 'QuicknoteSectionWorkingDischargeDiagnosis',
  QuicknoteSectionTcm = 'QuicknoteSectionTcm',
  QuicknoteSectionCreateNote = 'CreateNote',
  QuicknoteSectionUploadedDocuments = 'QuicknoteSectionUploadedDocuments',
  QuicknoteSectionLabOrders = 'QuicknoteSectionLabOrders',
  QuicknoteSectionLabResults = 'QuicknoteSectionLabResults',
  QuicknoteSectionAutoReferrals = 'QuicknoteSectionAutoReferrals',
  QuicknoteSectionUds = 'QuicknoteSectionUDS',
  QuickNoteSectionCopsR = 'QuicknoteSectionQuestionnaireCopsR',
  QuicknoteSectionFitForDutyPsychEval = 'QuicknoteSectionFitForDutyPsychEval',
  QuickNoteSectionAdultAsrs = 'QuicknoteSectionQuestionnaireAdultAsrs',
}

const questionnairesAddToNotesSection = [
  QuickNoteSectionName.QuestionnaireActualNoteView,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionPhq9}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionGad7}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionSnapIV}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionDast10}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionAudit}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionHamD}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionYbcos}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionMoca}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionAims}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionPcl5}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionCssrs}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionPsc17}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionCopsR}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionAdultAsrs}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionGqasc}`,

]

const COPY_PREVIOUS_BUTTON =
  'You do not have permission to Copy Previous. Please contact your supervisor if you need any further assistance.'
const PRINT_BUTTON_VISIT_VIEW =
  'You do not have permission to Print. Please contact your supervisor if you need any further assistance.'
const COPY_MY_PREVIOUS_BUTTON =
  'You do not have permission to Copy My Previous. Please contact your supervisor if you need any further assistance.'
const CLEAR_BUTTON =
  'You do not have permission to Clear. Please contact your supervisor if you need any further assistance.'
const SAVE_BUTTON =
  'You do not have permission to Save. Please contact your supervisor if you need any further assistance.'
const UPLOAD_BUTTON =
  'You do not have permission to Upload. Please contact your supervisor if you need any further assistance.'
const SIGN_BUTTON =
  'You do not have permission to Sign. Please contact your supervisor if you need any further assistance.'
const SEND_TO_SIGNATURE_BUTTON =
  'You do not have permission to Send to Signature. Please contact your supervisor if you need any further assistance.'
const CHANGE_COSIGNER =
  'You do not have permission to Change Cosigner. Please contact your supervisor if you need any further assistance.'
const SELECT_COSIGNER_DISABLED =
  'You do not have permission to Select Cosigner. Please contact your supervisor if you need any further assistance.'
const SELECT_PROVIDER_NON_TIME_DEPENDENT_VISIT =
  'You do not have permission to Select Provider. Please contact your supervisor if you need any further assistance.'
const SELECT_OTHER_PROVIDER_NON_TIME_DEPENDENT_VISIT =
  'You do not have permission to Select Other Provider. Please contact your supervisor if you need any further assistance.'

const SIGN_PRIOR_VISIT_TIME_WARNING =
  'Your note time is prior to visit scheduled time, do you wish to proceed?'
const SIGN_PROVIDER_NOTE_WARNING =
  'You are not the provider for this note, therefore you cannot sign this visit'
const SIGN_PRIMARY_NOTE_EXIST =
  'Primary note for this visit already exists, if you sign this note, it will mark the existing note as Error.'
const SIGN_CONSENT_WARNING =
  'Patient must sign the policy prior to signing the note. Please send the policy.'
const SIGN_PMP_WARNING =
  "'PMP is reviewed' checkbox is required for controlled substances."

const SIGN_FOLLOW_UP_WARNING =
  '"Patient did not want to follow up for this service" reason is required'

const SIGN_DIAGNOSIS_INSURANCE_WARNING = (
  items: QuickNoteSectionItem[] = [],
  visitType?: string,
): string => {
  const raw = getFirstSectionValue(items)

  if (!raw) return ''
  const codes = raw.split(',')

  const nonIns = codes.filter((c) =>
    isDiagnosisCodeExist(c, [
      ...QUESTIONNAIRE_DIAGNOSIS_CODE_SET,
      ...NON_INSURANCE_DIAGNOSIS_CODE_SET,
    ]),
  )
  if (nonIns.length === 0) return ''

  const codeList = nonIns.join(', ')

  return `Patient has working diagnosis ${codeList} which insurance may not cover. If this visit is scheduled, the patient may be charged self-pay for ${
    visitType ?? 'the visit'
  }.`
}

export {
  QuickNoteSectionName,
  questionnairesAddToNotesSection,
  COPY_PREVIOUS_BUTTON,
  PRINT_BUTTON_VISIT_VIEW,
  COPY_MY_PREVIOUS_BUTTON,
  CLEAR_BUTTON,
  SAVE_BUTTON,
  UPLOAD_BUTTON,
  SIGN_BUTTON,
  SEND_TO_SIGNATURE_BUTTON,
  CHANGE_COSIGNER,
  SELECT_COSIGNER_DISABLED,
  SELECT_PROVIDER_NON_TIME_DEPENDENT_VISIT,
  SELECT_OTHER_PROVIDER_NON_TIME_DEPENDENT_VISIT,
  // sing
  SIGN_PRIOR_VISIT_TIME_WARNING,
  SIGN_PROVIDER_NOTE_WARNING,
  SIGN_PRIMARY_NOTE_EXIST,
  SIGN_CONSENT_WARNING,
  SIGN_PMP_WARNING,
  SIGN_FOLLOW_UP_WARNING,
  SIGN_DIAGNOSIS_INSURANCE_WARNING,
}
