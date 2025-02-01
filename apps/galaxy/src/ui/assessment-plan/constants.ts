enum AssessmentPlanTabs {
  PAP = 'Psychiatry Assessment/Plan',
  TAP = 'Therapy Assessment/Plan',
  FIMAP = 'Family/Internal Medicine Assessment/Plan',
  AOAP = 'Add On',
  TCM = 'TCM',
}

enum AssessmentPlanTabsId {
  PAP_ID = 'psychiatry-assessment-plan',
  TAP_ID = 'therapy-assessment-plan',
  AOAP_ID = 'add-on-assessment-plan',
  FIMAP_ID = 'family-internal-medicine-assessment-plan',
  TCM_ID = 'tcm',
}
const ASSESSMENT_PLAN_ERROR_MESSAGE =
  'Atleast 30 characters are required in the assessment/plan textbox.'

export {
  AssessmentPlanTabs,
  AssessmentPlanTabsId,
  ASSESSMENT_PLAN_ERROR_MESSAGE,
}
