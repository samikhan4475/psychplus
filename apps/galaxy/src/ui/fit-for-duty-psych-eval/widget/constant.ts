const EMPLOYMENT_HAND_GUN_DESCRIPTION =
  'Describe if/when they have drawn their handgun in the line of duty in the past and the occasion and outcome. Also, describe if they have been accused of excessive force or abuse of authority or received any founded complaints regarding their conduct/performance'
const FAMILY_HISTORY_DETAIL =
  'Write brief description of family history. Include marital status of parents and their parenting style and how this affected them and their upbringing, detail patient’s relationship with family'
const COLLATERAL_INTERVIEWS =
  'During the interview with the direct higher up regarding this patient, please provide a brief summary of their overall opinion of the individual. Include comments on the patient’s work ethic, any known complaints, whether from the public or within the organization, and their relationships with team members. Additionally, please include the direct higher up’s perspective on the incident in question, along with their interpretation and opinion of the situation'
const RESULT_OF_INTERVIEW =
  'Write detailed description of what patient recalls of the incident from the start to the moment it ended. Be as detailed as possible- include the following: around what time frame in their shift did the event happen, events that took place, number of shots patient recalls firing vs real number fired, if anyone was injured or killed. How the patient felt during, and after the event. Include if they are on administrative duty, and if they have or have not been debriefed. Include what immediately happened after the event and what approx. time they got home. Include patient reaction/feeling towards the incident, has the patient had any disturbing feeling/nightmares and negative changes since this occurred'
const SUMMARY_AND_RECOMMENDATION =
  'Give a briefly describe of what lead to this fit-for duty evaluation. Include over all how the patient performed on the assessments, and if there is any post-trauma. Include what the rating suggests and what actions need to be taken.'
const WAS_OPTIONS = [
  { label: 'Was', value: 'was' },
  { label: 'Was not', value: 'wasNot' },
]

const DID_OPTIONS = [
  { label: 'Did', value: 'did' },
  { label: 'Did not', value: 'didNot' },
]

const BELOW_AVERAGE_OPTIONS = [
  { label: 'Below average', value: 'belowAverage' },
  { label: 'Average', value: 'average' },
  { label: 'Above average', value: 'aboveAverage' },
]

const WERE_OPTIONS = [
  { label: 'Were', value: 'were' },
  { label: 'Were not', value: 'wereNot' },
]

const IS_OPTIONS = [
  { label: 'Is', value: 'is' },
  { label: 'Is not', value: 'isNot' },
]
const IS_NO_OPTIONS = [
  { label: 'Is', value: 'is' },
  { label: 'Is no', value: 'isNo' },
]

const HAS_OPTIONS = [
  { label: 'Has', value: 'has' },
  { label: 'Has not', value: 'hasNot' },
]

const INJURY_SEVERITY_OPTIONS = [
  { label: 'Minor', value: 'minor' },
  { label: 'Major', value: 'major' },
]
const DOES_OPTIONS = [
  { label: 'Does', value: 'does' },
  { label: 'Does not', value: 'doesNot' },
]

const DO_OPTIONS = [
  { label: 'Do', value: 'do' },
  { label: 'Do not', value: 'doNot' },
]
const HAVE_OPTIONS = [
  { label: 'Have', value: 'have' },
  { label: 'Have not', value: 'haveNot' },
]

const RELATIONSHIP_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'In a relationship', value: 'inRelationship' },
]

const REMARKABLE_OPTIONS = [
  { label: 'Unremarkable', value: 'unremarkable' },
  { label: 'Remarkable', value: 'remarkable' },
]

const HIGH_SCHOOL_PERFORMANCE_OPTIONS = [
  ...BELOW_AVERAGE_OPTIONS,
  { label: 'Drop Out', value: 'dropOut' },
]
const INTERVIEWEE_ROLE_OPTIONS = [
  { label: 'Trooper', value: 'trooper' },
  { label: 'Homeland Security', value: 'homelandSecurity' },
  { label: 'THP Dispatcher', value: 'THP_Dispatcher' },
  {
    label: 'Other',
    value: 'other',
  },
]

const REFERRING_ORGANIZATION_OPTIONS = [
  {
    label: 'Tennessee Department of Homeland Security',
    value: 'tennesseeDepartmentOfHomelandSecurity',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const PATIENT_DESCRIPTION_BLOCK_CONFIG = [
  {
    field: 'patientHeightCategory',
    heading: 'Patient height is?',
    options: BELOW_AVERAGE_OPTIONS,
  },
  {
    field: 'patientFrameSize',
    heading: 'Patient frame size?',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'Extra-Large', value: 'extraLarge' },
    ],
  },
  {
    field: 'patientBodyBuild',
    heading: 'Patient body build?',
    options: [
      { label: 'Lean', value: 'lean' },
      { label: 'Athletic', value: 'athletic' },
      { label: 'Bulky', value: 'bulky' },
    ],
  },
]

const PATIENT_APPOINTMENT_BLOCK_CONFIG = [
  {
    field: 'wasOnTime',
    heading: 'Patient was on time for their appointment?',
    options: WAS_OPTIONS,
  },
  {
    field: 'dressed',
    heading: 'Patient was dressed?',
    options: [
      { label: 'Appropriately', value: 'appropriately' },
      { label: 'Inappropriately', value: 'inappropriately' },
    ],
  },
  {
    field: 'looked',
    heading: 'Patient looked?',
    options: [
      { label: 'Groomed', value: 'groomed' },
      { label: 'Disheveled', value: 'disheveled' },
    ],
  },
  {
    field: 'rapportEstablished',
    heading: 'Rapport was easily established?',
    options: WAS_OPTIONS,
  },
  {
    field: 'eyeContact',
    heading: 'Patient maintained good eye contact?',
    options: DID_OPTIONS,
  },
  {
    field: 'speechArticulate',
    heading: 'Patient speech was articulate and coherent?',
    options: WAS_OPTIONS,
  },
  {
    field: 'politeCooperative',
    heading:
      'Patient was polite and cooperative throughout the interview and assessment?',
    options: WAS_OPTIONS,
  },
  {
    field: 'relaxedConfident',
    heading: 'Patient appeared relaxed and confident upon introduction?',
    options: DID_OPTIONS,
  },
  {
    field: 'spokeFreely',
    heading: 'Patient spoke freely during questioning and conversation?',
    options: DID_OPTIONS,
  },
  {
    field: 'verbalSkills',
    heading: 'Patient interpersonal and verbal skills were deemed to be?',
    options: BELOW_AVERAGE_OPTIONS,
  },
  {
    field: 'affectAppropriate',
    heading:
      'Patient’s affect was normal and appropriate for to the situation?',
    options: WAS_OPTIONS,
  },
  {
    field: 'presentationValid',
    heading: 'Patient’s presentation was authentic and valid?',
    options: WAS_OPTIONS,
  },
  {
    field: 'thoughtStreamNormal',
    heading: 'Thought stream was free from associational disturbance?',
    options: WAS_OPTIONS,
  },
  {
    field: 'articulateThoughts',
    heading: 'Patient able to articulate thoughts appropriately?',
    options: WERE_OPTIONS,
  },
  {
    field: 'alertOriented',
    heading: 'Patient was alert and oriented to person, place, and time?',
    options: WAS_OPTIONS,
  },
  {
    field: 'memoryImpairment',
    heading: 'There was indication of memory impairment?',
    options: WAS_OPTIONS,
  },
  {
    field: 'immediateRecall',
    heading: 'Immediate recall appeared intact?',
    options: DID_OPTIONS,
  },
  {
    field: 'concentrationAttention',
    heading: 'Concentration and attention are within normal limits?',
    options: IS_OPTIONS,
  },
  {
    field: 'psychDisturbance',
    heading:
      'There is indication that patient suffers from forms of serious psychological disturbance.',
    options: IS_NO_OPTIONS,
  },
  {
    field: 'suicidalIdeation',
    heading:
      'Patient reported experiences of suicidal or homicidal ideation, remote or recent.',
    options: [
      { label: 'Denied', value: 'denied' },
      { label: 'Confirmed', value: 'confirmed' },
    ],
  },
]

const MEDICAL_BLOCK_CONFIG = [
  {
    field: 'hasAnxietyHistory',
    heading: 'Patient has a history of anxiety?',
    options: DOES_OPTIONS,
  },
  {
    field: 'hasDepressionHistory',
    heading: 'Patient has a history of depression?',
    options: DO_OPTIONS,
  },
  {
    field: 'hasHeadInjuryHistory',
    heading: 'Patient has a history of a head injury?',
    options: DOES_OPTIONS,
  },
  {
    field: 'hasLifeThreateningInjuryHistory',
    heading:
      'Patient has had a life-threatening injury or illness in the past five years?',
    options: [
      { label: 'Confirms', value: 'confirms' },
      { label: 'Denies', value: 'denies' },
    ],
  },
]

const IMPULSE_CONTROL_BLOCK_CONFIG = [
  {
    field: 'historyOfViolenceAsAdult',
    heading: 'Patient reported history of fighting or violence as an adult?',
    options: [
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Denied', value: 'denied' },
    ],
  },
  {
    field: 'historyOfDomesticViolence',
    heading: 'Patient has a history of domestic violence?',
    options: [
      { label: 'Does', value: 'does' },
      { label: 'Does not', value: 'doesNot' },
    ],
  },
  {
    field: 'reportsImpulsivity',
    heading:
      'Patient reports impulsivity in spending, speech or reckless behavior?',
    options: [
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Denied', value: 'denied' },
    ],
  },
  {
    field: 'hasBankruptcyOrPoorCredit',
    heading: 'Patient has been bankrupt or reported poor credit history?',
    options: [
      { label: 'Has', value: 'has' },
      { label: 'Has never', value: 'hasNever' },
    ],
  },
]

const CONCLUSION_BLOCK_CONFIG = [
  {
    field: 'isFitForDuty',
    heading: 'Patient is fit for duty.',
    options: IS_OPTIONS,
  },
  {
    field: 'hasPsychologicalDisorderAffectingFunction',
    heading:
      'Patient is suffering from a psychological disorder that limits job function or poses a safety risk to themself or others.',
    options: IS_OPTIONS,
  },
  {
    field: 'isSuicidalRiskEvident',
    heading: 'Suicidal risk is evident.',
    options: IS_OPTIONS,
  },
  {
    field: 'isWeaponMisuseThreat',
    heading:
      'Patient appears to be a threat to misuse their weapon against self and others.',
    options: DOES_OPTIONS,
  },
  {
    field: 'hasReasonableAccommodation',
    heading:
      'There are reasonable accommodations that help patient perform job?',
    options: [
      { label: 'Are', value: 'are' },
      { label: 'Are no', value: 'areNo' },
    ],
  },
]

const ALCOHOL_DRUGS_BLOCK_CONFIG = [
  {
    field: 'alcoholFrequency',
    heading: 'How often does patient drink alcohol per week?',
    options: [
      { label: '1', value: '1' },
      { label: '2-3', value: '2-3' },
      { label: 'Greater than 4', value: 'gt4' },
    ],
  },
  {
    field: 'drinksPerSitting',
    heading: 'How many drinks per sitting?',
    options: [
      { label: '1', value: '1' },
      { label: '2-3', value: '2-3' },
      { label: 'Greater than 4', value: 'gt4' },
    ],
  },
  {
    field: 'maxAlcoholConsumed',
    heading:
      'What is the greatest amount of alcohol patient has consumed in the last year?',
    maxLength: 50,
  },
  {
    field: 'concernAboutDrinking',
    heading:
      'Patient reports there has been concern about their current drinking habits.',
    options: HAS_OPTIONS,
  },
  {
    field: 'historyOfDrinkingProblems',
    heading: 'There is a history of problems related to drinking?',
    options: IS_NO_OPTIONS,
  },
  {
    field: 'alcoholTreatmentHistory',
    heading: 'Patient has been in an alcohol treatment program?',
    options: HAS_OPTIONS,
  },
  {
    field: 'alcoholTreatmentProgram',
    heading: 'List the program they attended and the time frame.',
    maxLength: 150,
    conditionalOn: {
      field: 'alcoholTreatmentHistory',
      value: 'has',
    },
  },
  {
    field: 'useOfIllicitDrugs',
    heading: 'Patient use of illicit or illegal drugs?',
    options: [
      { label: 'Confirms', value: 'confirms' },
      { label: 'Denies', value: 'denies' },
    ],
  },
  {
    field: 'marijuanaWhileEmployed',
    heading: 'Patient has used marijuana while employed with the state?',
    options: HAS_OPTIONS,
  },
  {
    field: 'useOfEnhancingDrugs',
    heading:
      'Patient has used steroids, HGH or other illicit performance enhancing drugs?',
    options: HAS_OPTIONS,
  },
]

export {
  PATIENT_DESCRIPTION_BLOCK_CONFIG,
  PATIENT_APPOINTMENT_BLOCK_CONFIG,
  MEDICAL_BLOCK_CONFIG,
  IMPULSE_CONTROL_BLOCK_CONFIG,
  CONCLUSION_BLOCK_CONFIG,
  WAS_OPTIONS,
  WERE_OPTIONS,
  DID_OPTIONS,
  IS_OPTIONS,
  BELOW_AVERAGE_OPTIONS,
  INJURY_SEVERITY_OPTIONS,
  HAS_OPTIONS,
  RELATIONSHIP_STATUS_OPTIONS,
  DOES_OPTIONS,
  HAVE_OPTIONS,
  REMARKABLE_OPTIONS,
  EMPLOYMENT_HAND_GUN_DESCRIPTION,
  HIGH_SCHOOL_PERFORMANCE_OPTIONS,
  FAMILY_HISTORY_DETAIL,
  COLLATERAL_INTERVIEWS,
  RESULT_OF_INTERVIEW,
  SUMMARY_AND_RECOMMENDATION,
  ALCOHOL_DRUGS_BLOCK_CONFIG,
  REFERRING_ORGANIZATION_OPTIONS,
  INTERVIEWEE_ROLE_OPTIONS,
}