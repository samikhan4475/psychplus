const QUESTIONS = [
  'Patient Health Questionnaire (PHQ-9)',
  'Generalized Anxiety Disorder (GAD-7)',
  'Swanson, Nolan and Pelham (SNAP-IV)',
  'Posttraumatic Stress Disorder Checklist (PCL-5)',
  'Yale-Brown Obsessive Compulsive (Y-BOCS)',
  'Abnormal Involuntary Movement Scale (AIMS)',
  'Alcohol Use Disorders Identification Test (AUDIT)',
  'Drug Abuse Screening Test (DAST-10)',
  'Montreal Cognitive Assessment (MoCA)',
  'Hamilton Depression Rating Scale (HAM-D)',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
}))

export { QUESTIONS }
