import { QuickNoteSectionName } from '../quicknotes/constants'

enum QuestionnaireTabs {
  DASHBOARD_TAB = 'Dashboard',
  PHQ_9_TAB = 'PHQ-9',
  GAD_7_TAB = 'GAD-7',
  SNAP_IV_TAB = 'SNAP-IV',
  PCL_5_TAB = 'PCL-5',
  Y_BOCS_TAB = 'Y-BOCS',
  AIMS_TAB = 'AIMS',
  AUDIT_TAB = 'AUDIT',
  DAST_10_TAB = 'DAST-10',
  MOCA_TAB = 'MOCA',
  HAM_D_TAB = 'HAM-D',
  C_SSRS_TAB = 'C-SSRS',
  PSC_17_TAB = 'PSC-17',
  COPS_R_TAB = 'COPS-R',
}

enum QuestionnairesStatus {
  Completed = 'Completed',
  Requested = 'Requested',
}

enum QuestionnairesFilledBy {
  Patient = 'Patient',
  Provider = 'Provider',
}

enum QuestionnairesTitles {
  'PHQ-9' = 'Patient Health Questionnaire (PHQ-9)',
  'GAD-7' = 'Generalized Anxiety Disorder (GAD-7)',
  'SNAP-IV' = 'Swanson, Nolan and Pelham (SNAP-IV)',
  'PCL-5' = 'Posttraumatic Stress Disorder Checklist (PCL-5)',
  'Y-BOCS' = 'Yale-Brown Obsessive Compulsive (Y-BOCS)',
  'AIMS' = 'Abnormal Involuntary Movement Scale (AIMS)',
  'AUDIT' = 'Alcohol Use Disorders Identification Test (AUDIT)',
  'DAST-10' = 'Drug Abuse Screening Test (DAST-10)',
  'MOCA' = 'Montreal Cognitive Assessment (MoCA)',
  'HAM-D' = 'Hamilton Depression Rating Scale (HAM-D)',
  'C-SSRS' = 'Columbia-Suicide Severity Rating Scale (C-SSRS)',
  'PSC-17' = 'Pediatric Symptom Checklist-17 (PSC-17)',
  'COPS-R'= 'Candidate & Officer Personnel Survey (COPS-R)'
}

const quickNotesSectionsTitles = {
  [QuickNoteSectionName.QuickNoteSectionPhq9]:
    'Patient Health Questionnaire (PHQ-9)',
  [QuickNoteSectionName.QuickNoteSectionGad7]:
    'Generalized Anxiety Disorder (GAD-7)',
  [QuickNoteSectionName.QuickNoteSectionPcl5]:
    'Posttraumatic Stress Disorder Checklist (PCL-5)',
  [QuickNoteSectionName.QuickNoteSectionSnapIV]:
    'Swanson, Nolan and Pelham (SNAP-IV)',
  [QuickNoteSectionName.QuickNoteSectionYbcos]:
    'Yale-Brown Obsessive Compulsive (Y-BOCS)',
  [QuickNoteSectionName.QuickNoteSectionAudit]:
    'Alcohol Use Disorders Identification Test (AUDIT)',
  [QuickNoteSectionName.QuickNoteSectionAims]:
    'Abnormal Involuntary Movement Scale (AIMS)',
  [QuickNoteSectionName.QuickNoteSectionHamD]:
    'Hamilton Depression Rating Scale (HAM-D)',
  [QuickNoteSectionName.QuickNoteSectionMoca]:
    'Montreal Cognitive Assessment (MoCA)',
  [QuickNoteSectionName.QuickNoteSectionDast10]:
    'Drug Abuse Screening Test (DAST-10)',
  [QuickNoteSectionName.QuickNoteSectionCssrs]:
    'Columbia-Suicide Severity Rating Scale (C-SSRS)',
  [QuickNoteSectionName.QuickNoteSectionPsc17]:
    'Pediatric Symptom Checklist-17 (PSC-17)',
    [QuickNoteSectionName.QuickNoteSectionCopsR]:
    'Candidate & Officer Personnel Survey (COPS-R)'
}

export {
  QuestionnaireTabs,
  QuestionnairesStatus,
  QuestionnairesFilledBy,
  QuestionnairesTitles,
  quickNotesSectionsTitles,
}
