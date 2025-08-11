import { FieldBlock } from './types'

const EMPLOYMENT_HAND_GUN_DESCRIPTION =
  'Describe if/when they have drawn their handgun in the line of duty in the past and the occasion and outcome. Also, describe if they have been accused of excessive force or abuse of authority or received any founded complaints regarding their conduct/performance.'
const FAMILY_HISTORY_DETAIL =
  'Write brief description of family history. Include marital status of parents and their parenting style and how this affected them and their upbringing, detail patient’s relationship with family.'
const PRE_FAMILY_HISTORY_DETAIL =
  ' Write brief description of family history. Include if patient is an only child, or has siblings, include marital status of parents and their parenting style and how this affected them and their upbringing, detail patient’s relationship with family.'
const COLLATERAL_INTERVIEWS =
  'During the interview with the direct higher up regarding this patient, please provide a brief summary of their overall opinion of the individual. Include comments on the patient’s work ethic, any known complaints, whether from the public or within the organization, and their relationships with team members. Additionally, please include the direct higher up’s perspective on the incident in question, along with their interpretation and opinion of the situation.'
const RESULT_OF_INTERVIEW =
  'Write detailed description of what patient recalls of the incident from the start to the moment it ended. Be as detailed as possible- include the following: around what time frame in their shift did the event happen, events that took place, number of shots patient recalls firing vs real number fired, if anyone was injured or killed. How the patient felt during, and after the event. Include if they are on administrative duty, and if they have or have not been debriefed. Include what immediately happened after the event and what approx. time they got home. Include patient reaction/feeling towards the incident, has the patient had any disturbing feeling/nightmares and negative changes since this occurred.'
const SUMMARY_AND_RECOMMENDATION =
  'Give a briefly describe of what lead to this fit-for duty evaluation. Include over all how the patient performed on the assessments, and if there is any post-trauma. Include what the rating suggests and what actions need to be taken.'
const WAS_OPTIONS = [
  { label: 'Was', value: 'was' },
  { label: 'Was not', value: 'wasNot' },
]
const BE_OPTIONS = [
  { label: 'Be', value: 'be' },
  { label: 'Not be', value: 'notBe' },
]

const DID_OPTIONS = [
  { label: 'Did', value: 'did' },
  { label: 'Did not', value: 'didNot' },
]
const LIVING_ARRANGEMENT_OPTIONS = [
  { label: 'Alone', value: 'alone' },
  { label: 'With roommate(s)', value: 'withRoommates' },
  { label: 'With parent(s)', value: 'withParents' },
  { label: 'With spouse', value: 'withSpouse' },
  { label: 'With partner', value: 'withPartner' },
  { label: 'With children', value: 'withChildren' },
  { label: 'With spouse and children', value: 'withSpouseAndChildren' },
  { label: 'With guardian(s)', value: 'withGuardians' },
  { label: 'In a supported living arrangement', value: 'supportedLiving' },
  { label: 'Other', value: 'other' },
]
const CONFIRM_OPTIONS = [
  { label: 'Confirms', value: 'confirms' },
  { label: 'Denies', value: 'denies' },
]

const BELOW_AVERAGE_OPTIONS = [
  { label: 'Below average', value: 'belowAverage' },
  { label: 'Average', value: 'average' },
  { label: 'Above average', value: 'aboveAverage' },
]
const ABOVE_AVERAGE_OPTIONS = [
  { label: 'Above average', value: 'aboveAverage' },
  { label: 'Average', value: 'average' },
  { label: 'Below average', value: 'belowAverage' },
]

const WERE_OPTIONS = [
  { label: 'Were', value: 'were' },
  { label: 'Were not', value: 'wereNot' },
]

const WAS_NO_OPTIONS = [
  { label: 'Was', value: 'was' },
  { label: 'Was no', value: 'wasNo' },
]

const IS_OPTIONS = [
  { label: 'Is', value: 'is' },
  { label: 'Is not', value: 'isNot' },
]
const IS_NO_OPTIONS = [
  { label: 'Is', value: 'is' },
  { label: 'Is no', value: 'isNo' },
]
const NO_IS_OPTIONS = [
  { label: 'Is no', value: 'isNo' },
  { label: 'Is', value: 'is' },
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

const ARE_OPTIONS = [
  { label: 'Are', value: 'are' },
  { label: 'Are not', value: 'areNot' },
]
const RELATIONSHIP_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'In a relationship', value: 'inARelationship' },
]

const REMARKABLE_OPTIONS = [
  { label: 'Unremarkable', value: 'unremarkable' },
  { label: 'Remarkable', value: 'remarkable' },
]

const WOULD_OPTIONS = [
  { label: 'Would', value: 'would' },
  { label: 'Would not', value: 'wouldNot' },
]

const ACCEPTABLE_OPTIONS = [
  { label: 'Acceptable', value: 'acceptable' },
  { label: 'Unacceptable', value: 'unacceptable' },
]

const HIGH_SCHOOL_PERFORMANCE_OPTIONS = [
  ...ABOVE_AVERAGE_OPTIONS,
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
    heading: 'Patient frame size is?',
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
    heading: 'Patient’s affect was normal and appropriate to to the situation?',
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
    heading: 'There was no indication of memory impairment?',
    options: WAS_NO_OPTIONS,
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
      'Patient is suffering from a psychological disorder that limits job function or pose a safety of themself or others.',
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

const ALCOHOL_DRUGS_BLOCK_CONFIG: FieldBlock[] = [
  {
    field: 'alcoholFrequency',
    heading: 'How often does patient drink alcohol per week?',
    options: [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2-3', value: '2-3' },
      { label: 'greater than 4', value: 'greaterThan4' },
    ],
  },
  {
    field: 'drinksPerSitting',
    heading: 'How many drinks per sitting?',
    options: [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2-3', value: '2-3' },
      { label: 'greater than 4', value: 'greaterThan4' },
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
      'Patient reports that there has been expressed concern about their current drinking habits.',
    options: HAS_OPTIONS,
  },
  {
    field: 'historyOfDrinkingProblems',
    heading: 'There is a history of problems related to drinking.',
    options: IS_NO_OPTIONS,
  },
  {
    field: 'alcoholTreatmentHistory',
    heading: 'Patient has been in an alcohol treatment program.',
    options: HAS_OPTIONS,
  },
  {
    field: 'alcoholTreatmentProgram',
    heading: 'List the program that they attended and the time frame.',
    maxLength: 150,
    conditionalOn: {
      field: 'alcoholTreatmentHistory',
      value: 'has',
    },
  },
  {
    field: 'useOfIllicitDrugs',
    heading: 'Patient confirms involvement with illicit or illegal drugs.',
    options: [
      { label: 'Confirms', value: 'confirms' },
      { label: 'Denies', value: 'denies' },
    ],
  },
  {
    field: 'marijuanaWhileEmployed',
    heading: 'Patient has used marijuana while employed with the state.',
    options: HAS_OPTIONS,
  },
  {
    field: 'useOfEnhancingDrugs',
    heading:
      'Patient has used steroids, human growth hormone or other illicit performance enhancing drugs.',
    options: HAS_OPTIONS,
  },
]

const INCIDENT_RISK_OPTIONS: FieldBlock = {
  field: 'incidentRiskLikelihood',
  heading: 'Likelihood of a drug/alcohol-related incident is deemed',
  options: [
    { label: 'Minimal', value: 'minimal' },
    { label: 'Possible', value: 'possible' },
    { label: 'Likely', value: 'likely' },
  ],
}

const PATIENT_APPOINTMENT_DETAILS_CONFIG = [
  {
    field: 'onTime',
    heading: 'Patient was on time for their appt.',
    options: WAS_OPTIONS,
  },
  {
    field: 'dressed',
    heading: 'Patient was dressed:',
    options: [
      { label: 'Appropriately', value: 'appropriately' },
      { label: 'Inappropriately', value: 'inappropriately' },
    ],
  },
  {
    field: 'appearance',
    heading: 'Patient looked?',
    options: [
      { label: 'Groomed', value: 'groomed' },
      { label: 'Disheveled', value: 'disheveled' },
    ],
  },
  {
    field: 'rapport',
    heading: 'Rapport was easily established.',
    options: WAS_OPTIONS,
  },
  {
    field: 'eyeContact',
    heading: 'Patient maintained good eye contact',
    options: DID_OPTIONS,
  },
  {
    field: 'speech',
    heading: 'Patient’s speech was articulate and coherent.',
    options: WAS_OPTIONS,
  },
  {
    field: 'polite',
    heading:
      'Patient was polite and cooperative throughout the interview and assessment.',
    options: WAS_OPTIONS,
  },
  {
    field: 'relaxed',
    heading: 'Patient appeared relaxed and confident upon introduction.',
    options: DID_OPTIONS,
  },
  {
    field: 'spokeFreely',
    heading: 'Patient spoke freely during questioning and conversation.',
    options: DID_OPTIONS,
  },
  {
    field: 'interpersonalSkills',
    heading: 'Patient interpersonal and verbal skills were:',
    options: BELOW_AVERAGE_OPTIONS,
  },
  {
    field: 'affect',
    heading: 'Patient affect was normal and appropriate to the situation.',
    options: WAS_OPTIONS,
  },
  {
    field: 'presentation',
    heading: 'Patient presentation is judged to have been authentic and valid.',
    options: IS_OPTIONS,
  },
  {
    field: 'thoughtStream',
    heading:
      'Thought stream, as manifested by their speech, was free from associational disturbance.',
    options: WAS_OPTIONS,
  },
  {
    field: 'articulateThoughts',
    heading:
      'They are able to articulate their thoughts in an appropriate manner.',
    options: ARE_OPTIONS,
  },
  {
    field: 'alertness',
    heading: 'Patient was alert, and oriented to person, place and time.',
    options: WAS_OPTIONS,
  },
  {
    field: 'memoryImpairment',
    heading: 'There is no indication of impairment in recent or remote memory.',
    options: NO_IS_OPTIONS,
  },
  {
    field: 'immediateRecall',
    heading: 'Immediate recall appeared intact.',
    options: DID_OPTIONS,
  },
  {
    field: 'psychologicalDisturbance',
    heading:
      'There is indication that the subject suffers from forms of serious psychological disturbance.',
    options: NO_IS_OPTIONS,
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
const EMPLOYMENT_BLOCK_CONFIG = [
  {
    field: 'hasDisciplinaryActions',
    heading: 'Patient has had disciplinary write-ups/actions while employed.',
    options: HAS_OPTIONS,
  },
  {
    field: 'disciplinaryIncidentDescription',
    heading: 'Describe the incident that led to reprimand',
    maxLength: 150,
    conditionalOn: {
      field: 'hasDisciplinaryActions',
      value: 'has',
    },
  },
  {
    field: 'useOfForceOrComplaints',
    heading:
      'Describe if/when they have drawn their handgun in the line of duty in the past and the occasion and outcome. Also, describe if they have been accused of excessive force or abuse of authority or received any founded complaints regarding their conduct/performance.',
    maxLength: 1000,
  },
]

const LEGAL_BLOCK_CONFIG = [
  {
    field: 'legalHistory',
    heading: 'Patient does not have a history of legal difficulties.',
    options: DOES_OPTIONS,
  },
  {
    field: 'legalHistoryDetails',
    heading: 'Describe the legal difficulties the patient has faced:',
    maxLength: 200,
    conditionalOn: {
      field: 'legalHistory',
      value: 'does',
    },
  },
  {
    field: 'restrainingOrder',
    heading: 'They have been the subject of a restraining order.',
    options: HAVE_OPTIONS,
  },
  {
    field: 'restrainingOrderDetails',
    heading: 'Describe the situation that led to this restraining order:',
    maxLength: 200,
    conditionalOn: {
      field: 'restrainingOrder',
      value: 'have',
    },
  },
  {
    field: 'civilLitigation',
    heading: 'Patient has been involved in civil litigation.',
    options: HAS_OPTIONS,
  },
  {
    field: 'civilLitigationDetails',
    heading: 'Describe the situation that led to this litigation:',
    maxLength: 200,
    conditionalOn: {
      field: 'civilLitigation',
      value: 'has',
    },
  },
  {
    field: 'motorVehicleRecord',
    heading: 'Patient motor vehicle record is:',
    options: [
      { label: 'Unremarkable', value: 'unremarkable' },
      { label: 'Remarkable', value: 'remarkable' },
    ],
  },
  {
    field: 'motorVehicleRecordDetails',
    heading: 'Describe what makes it remarkable:',
    maxLength: 200,
    conditionalOn: {
      field: 'motorVehicleRecord',
      value: 'remarkable',
    },
  },
]
const PATIENT_RESULT_CONFIG = [
  {
    field: 'respondedCandidly',
    heading: 'Patient responded consistently and candidly.',
    options: DID_OPTIONS,
  },
  {
    field: 'emotionalDistress',
    heading:
      'Patient reflects the presence of significant levels of emotional distress or psychological disturbance that makes them unsuitable for the position sought.',
    options: DOES_OPTIONS,
  },
]
const RESULTS_OF_ASSESSMENT_CONFIG = [
  {
    field: 'historyOfPsychologicalIssues',
    heading:
      'There is indication in patient history of anxiety, depression or other psychological disturbances.',
    options: IS_NO_OPTIONS,
  },
  {
    field: 'treatmentFromProfessional',
    heading:
      'Patient has received treatment from a mental health professional.',
    options: [
      { label: 'Has', value: 'has' },
      { label: 'Has never', value: 'hasNever' },
    ],
  },
  {
    field: 'takenMedication',
    heading:
      'Patient has taken medication for symptoms of a psychological disorder.',
    options: HAS_OPTIONS,
  },
  {
    field: 'globalPrediction',
    heading:
      'Global Prediction Scale indicated that this individual is likely to prove acceptable as a public safety employee.',
    options: ACCEPTABLE_OPTIONS,
  },
  {
    field: 'biodataRatings',
    heading:
      'Bio-data ratings reflect overall social adjustment, self-discipline and motivational level as',
    options: ACCEPTABLE_OPTIONS,
  },
  {
    field: 'teamOrientation',
    heading: 'Ratings indicate patient’s team orientation is:',
    options: [
      { label: 'Positive', value: 'positive' },
      { label: 'Negative', value: 'negative' },
    ],
  },
  {
    field: 'authorityDeference',
    heading: 'Patient’s deference towards authority is:',
    options: ACCEPTABLE_OPTIONS,
  },
  {
    field: 'followOrders',
    heading:
      'Patient would be willing to follow orders and accept supervision and work within a chain of command.',
    options: WOULD_OPTIONS,
  },
  {
    field: 'feedbackReaction',
    heading:
      'Patient should also react to direct feedback regarding their performance.',
    options: [
      { label: 'Positively', value: 'positively' },
      { label: 'Negatively', value: 'negatively' },
    ],
  },
  {
    field: 'takeResponsibility',
    heading:
      'Patient would take responsibility for the decisions and mistakes.',
    options: WOULD_OPTIONS,
  },
  {
    field: 'acceptCriticism',
    heading: 'Patient appears to be accepting of criticism.',
    options: [
      { label: 'Accepting', value: 'accepting' },
      { label: 'Rejecting', value: 'rejecting' },
    ],
  },
  {
    field: 'takeDirection',
    heading: 'Patient will likely take direction:',
    options: [
      { label: 'Without resistance ', value: 'withoutResistance' },
      { label: 'With resistance', value: 'withResistance' },
    ],
  },
  {
    field: 'supervisorRatings',
    heading:
      'Overall, the data suggests patient is likely to earn positive supervisor ratings.',
    options: [
      { label: 'Positive', value: 'positive' },
      { label: 'Negative', value: 'negative' },
    ],
  },
  {
    field: 'interactionWithOthers',
    heading:
      'Patient will interact and work with other officers and the public.',
    options: [
      { label: 'Well', value: 'well' },
      { label: 'Poorly', value: 'poorly' },
    ],
  },
  {
    field: 'treatsOthersFairly',
    heading:
      'Results also indicate that this subject would treat others honestly and fairly.',
    options: WOULD_OPTIONS,
  },
  {
    field: 'taskCompletion',
    heading:
      'Patient would complete important tasks in an organized and timely manner.',
    options: WOULD_OPTIONS,
  },
  {
    field: 'scenarioResponseQuality',
    heading:
      'Patient’s response to the written scenario fell within the range of:',
    options: ABOVE_AVERAGE_OPTIONS,
  },
  {
    field: 'analyticalAbility',
    heading:
      'The response reflected analytical abilities and common sense that were.',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Typical', value: 'typical' },
      { label: 'Poor', value: 'poor' },
    ],
  },
  {
    field: 'writingSkills',
    heading: 'Patient’s writing skills appear to be:',
    options: [
      { label: 'Adequate', value: 'adequate' },
      { label: 'Inadequate', value: 'inadequate' },
    ],
  },
  {
    field: 'judgmentOnJob',
    heading: "Data suggests that the patient's judgment on the job will be”",
    options: [
      { label: 'Adequate', value: 'adequate' },
      { label: 'Inadequate', value: 'inadequate' },
    ],
  },
  {
    field: 'impulseControl',
    heading: 'Patient will display impulse control that is:',
    options: [
      { label: 'Good', value: 'good' },
      { label: 'Bad', value: 'bad' },
    ],
  },
  {
    field: 'serviceOrientation',
    heading: 'Patient’s service orientation is:',
    options: [
      { label: 'Strong', value: 'strong' },
      { label: 'Weak', value: 'weak' },
    ],
  },
  {
    field: 'aggressiveTraits',
    heading:
      'Patient displayed signs of aggressive attitudes/traits, authoritarian attitudes, or gender biases:',
    options: DID_OPTIONS,
  },
  {
    field: 'disqualifyingRisk',
    heading:
      'Risk factors were identified that were deemed of sufficient to disqualify the candidate.',
    options: [
      { label: 'Were no', value: 'wereNo' },
      { label: 'Were', value: 'were' },
    ],
  },
  {
    field: 'overallAssessment',
    heading:
      ' In the absence of any background investigation that contradicts available biodata, assessment and interview data, the results of this evaluation indicate that this candidate provides:',
    options: [
      { label: 'Adequate', value: 'adequate' },
      { label: 'Inadequate', value: 'inadequate' },
    ],
  },
  {
    field: 'finalRecommendation',
    heading: 'Patient will be recommended.',
    options: [
      { label: 'Will', value: 'will' },
      { label: 'Will not', value: 'willNot' },
    ],
  },
]

export {
  PATIENT_DESCRIPTION_BLOCK_CONFIG,
  PATIENT_APPOINTMENT_BLOCK_CONFIG,
  PATIENT_RESULT_CONFIG,
  MEDICAL_BLOCK_CONFIG,
  IMPULSE_CONTROL_BLOCK_CONFIG,
  CONCLUSION_BLOCK_CONFIG,
  WAS_OPTIONS,
  WERE_OPTIONS,
  DID_OPTIONS,
  IS_OPTIONS,
  BELOW_AVERAGE_OPTIONS,
  ABOVE_AVERAGE_OPTIONS,
  INJURY_SEVERITY_OPTIONS,
  HAS_OPTIONS,
  RELATIONSHIP_STATUS_OPTIONS,
  DOES_OPTIONS,
  HAVE_OPTIONS,
  REMARKABLE_OPTIONS,
  EMPLOYMENT_HAND_GUN_DESCRIPTION,
  HIGH_SCHOOL_PERFORMANCE_OPTIONS,
  FAMILY_HISTORY_DETAIL,
  PRE_FAMILY_HISTORY_DETAIL,
  COLLATERAL_INTERVIEWS,
  RESULT_OF_INTERVIEW,
  SUMMARY_AND_RECOMMENDATION,
  ALCOHOL_DRUGS_BLOCK_CONFIG,
  REFERRING_ORGANIZATION_OPTIONS,
  INTERVIEWEE_ROLE_OPTIONS,
  INCIDENT_RISK_OPTIONS,
  PATIENT_APPOINTMENT_DETAILS_CONFIG,
  BE_OPTIONS,
  EMPLOYMENT_BLOCK_CONFIG,
  LEGAL_BLOCK_CONFIG,
  RESULTS_OF_ASSESSMENT_CONFIG,
  LIVING_ARRANGEMENT_OPTIONS,
  CONFIRM_OPTIONS,
  NO_IS_OPTIONS,
}
