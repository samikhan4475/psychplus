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
  "PHQ-9" = 'Patient Health Questionnaire (PHQ-9)',
  "GAD-7" = 'Generalized Anxiety Disorder (GAD-7)',
  "SNAP-IV" = 'Swanson, Nolan and Pelham (SNAP-IV)',
  "PCL-5" = 'Posttraumatic Stress Disorder Checklist (PCL-5)',
  "Y-BOCS" = 'Yale-Brown Obsessive Compulsive (Y-BOCS)',
  "AIMS" = 'Abnormal Involuntary Movement Scale (AIMS)',
  "AUDIT" = 'Alcohol Use Disorders Identification Test (AUDIT)',
  "DAST-10" = 'Drug Abuse Screening Test (DAST-10)',
  "MOCA" = 'Montreal Cognitive Assessment (MoCA)',
  "HAM-D" = 'Hamilton Depression Rating Scale (HAM-D)',
}


export { QuestionnaireTabs, QuestionnairesStatus, QuestionnairesFilledBy, QuestionnairesTitles }
