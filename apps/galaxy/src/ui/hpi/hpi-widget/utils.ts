import { HpiWidgetSchemaType } from './hpi-widget-schema'

const assignSpecificFields = (
  result: HpiWidgetSchemaType,
): Record<string, (value: string) => void> => ({
  ccOtherDetails: (value) => {
    result.ccOtherDetails = value
  },
  subOtherDetails: (value) => {
    result.subOtherDetails = value
  },
  medOtherDetails: (value) => {
    result.medOtherDetails = value
  },
  hpiOther: (value) => {
    result.hpiOther = value
  },
  schizophreniaDelusionValues: (value) => {
    result.schizophreniaDelusionValues = value.split(',')
  },
  schizophreniaHallucinationsValues: (value) => {
    result.schizophreniaHallucinationsValues = value.split(',')
  },
})

const getInitialValues = (): HpiWidgetSchemaType => ({
  chiefComplaint: [],
  depression: [],
  anxiety: [],
  ptsd: [],
  obsession: [],
  bpd: [],
  substance: [],
  adhdInattentive: [],
  adhdHyperactive: [],
  dementia: [],
  schizophrenia: [],
  medicationSe: [],
  autism: [],
  schizophreniaHallucinationsValues: [],
  schizophreniaDelusionValues: [],
  bipolarMania: [],
  conductDisorder: [],
  ocd: [],
  hpiOther: '',
  ccOtherDetails: '',
  subOtherDetails: '',
  medOtherDetails: '',
})

const valueToLabel: { [key: string]: string } = {
  // Chief complaint block
  CC_Depression: 'depression',
  CC_Anxiety: 'anxiety',
  CC_Bipolar: 'bipolar/mania',
  CC_Ptsd: 'ptsd',
  CC_Ocd: 'ocd',
  CC_Obsession: 'obsession',
  CC_Bpd: 'bpd',
  CC_Substance: 'substance',
  CC_Adhdi: 'adhdh inattentive',
  CC_Adhdh: 'adhdh hyperactive',
  CC_Autism: 'autism',
  CC_ConductDisorder: 'conduct disorder',
  CC_Dementia: 'dementia',
  CC_Schizophrenia: 'schizophrenia',
  CC_MedicationSe: 'medication se',
  CC_Other: 'ccOther',

  // Depression block
  DEP_LowMood: 'low mood',
  DEP_SleepConcerns: 'sleep concerns',
  DEP_LowInterest: 'low interest',
  DEP_Guilt: 'guilt',
  DEP_PoorEnergy: 'poor energy',
  DEP_PoorConcentration: 'poor concentration',
  DEP_PoorMotivation: 'poor motivation',
  DEP_AppetiteConcerns: 'appetite concerns',
  DEP_Hopeless: 'hopeless',
  DEP_Slowing: 'slowing',
  DEP_Agitation: 'agitation',
  DEP_SuicidalThoughts: 'suicidal thoughts',
  DEP_Anger: 'anger',

  // Anxiety block
  ANX_AbnormalFear: 'abnormal fear',
  ANX_Fatigue: 'fatigue',
  ANX_FeelingAnxious: 'feeling anxious',
  ANX_Irritable: 'irritable',
  ANX_MuscleTension: 'muscle tension',
  ANX_PanicAttacks: 'panic attacks',
  ANX_Phobia: 'phobia',
  ANX_Restless: 'restless',
  ANX_SocialAnxiety: 'social anxiety',
  ANX_Worrying: 'worrying',

  // Bipolar/Mania  block
  MAN_ElevatedMood: 'elevated mood',
  MAN_Distractibility: 'distractibility',
  MAN_GoalDirected: 'goal directed',
  MAN_GrandioseDelusions: 'grandiose delusions',
  MAN_FlightOfIdeas: 'flight Of ideas',
  MAN_LackOfSleep: 'lack Of sleep',
  MAN_PressuredSpeech: 'pressured speech',
  MAN_ImpulsiveRecklessBehavior: 'impulsive reckless behavior',

  // PTSD  block
  PTS_TraumaticEvent: 'traumatic event',
  PTS_IntrusiveMemories: 'intrusive memories',
  PTS_Nightmares: 'nightmares',
  PTS_NightTerrors: 'night terrors',
  PTS_Flashbacks: 'flashbacks',
  PTS_DissociativeEpisodes: 'dissociative episodes',
  PTS_Hypervigilance: 'hypervigilance',
  PTS_Avoidance: 'avoidance',
  PTS_Startled: 'startled',
  PTS_Detachment: 'detachment',

  // Obesession  block
  OBS_Contamination: 'contamination',
  OBS_Doubt: 'doubt',
  OBS_Somatic: 'somatic',
  OBS_Aggression: 'aggression',
  OBS_Sexual: 'sexual',

  // OCD  block
  OCD_Checking: 'checking',
  OCD_Washing: 'washing',
  OCD_Counting: 'counting',
  OCD_Hoarding: 'hoarding',
  OCD_Picking: 'picking',

  // Borderline Personality disorder block
  BPD_BlackWhiteThinking: 'black white thinking',
  BPD_FearOfAbandonment: 'fear of abandonment',
  BPD_Impulsiveness: 'impulsiveness',
  BPD_MoodSwings: 'mood swings',
  BPD_SelfHarm: 'self-harm',
  BPD_UnstableRelationships: 'unstable relationships',
  BPD_UnstableSelfImage: 'unstable self-image',

  // Substance block
  SUB_Tobacco: 'tobacco',
  SUB_Alcohol: 'alcohol',
  SUB_Opioids: 'opioids',
  SUB_Marijuana: 'marijuana',
  SUB_Benzos: 'benzos',
  SUB_Cocaine: 'cocaine',
  SUB_Amphetamine: 'amphetamine',
  SUB_Pcp: 'pcp',
  SUB_Inhalant: 'inhalant',
  SUB_Other: 'subOther',

  // ADHDI Block
  ADI_CarelessMistakes: 'careless mistakes',
  ADI_DecreasedAttention: 'decreased attention',
  ADI_DoesntListen: 'doesnt listen',
  ADI_HardToFollowInstruction: 'hard to follow instruction',
  ADI_DifficultyOrganizing: 'difficulty organizing',
  ADI_DifficultyToDoDetailOrientedTasks:
    'difficulty to do detail oriented tasks',
  ADI_LosesThings: 'loses things',
  ADI_EasilyDistracted: 'easily distracted',
  ADI_Forgetful: 'forgetful',

  // ADHDH Block
  ADH_Fidgeting: 'fidgeting',
  ADH_LeavesAssignedSpace: 'leaves assigned space',
  ADH_Restless: 'restless',
  ADH_HardToEnjoyRelaxing: 'hard to enjoy relaxing',
  ADH_OnTheGo: 'on the go',
  ADH_ExcessiveTalking: 'excessive talking',
  ADH_BlurtsOutAnswers: 'blurts out answers',
  ADH_Impatient: 'impatient',
  ADH_Interrupts: 'interrupts',
  ADH_BehaviorOutbursts: 'behavior outbursts',

  // Autism Block
  AUT_Fidgeting: 'delayed milestones',
  AUT_Repetitive: 'repetitive/restrictive behaviors',
  AUT_Regression: 'regression',
  AUT_Social: 'social communication issues',
  AUT_Aversions: 'aversions',
  AUT_Masking: 'masking',
  AUT_EmotionalDysregulation: 'emotional dysregulation',

  // Conduct Disorder Block
  CD_DisciplineIssues: 'discipline issues',
  CD_Defiance: 'defiance',
  CD_Argumentative: 'argumentative',
  CD_Vengeful: 'vengeful',
  CD_Deceitful: 'deceitful',
  CD_Destructive: 'destructive',
  CD_DisproportionateAnger: 'disproportionate anger',
  CD_AnimalCruelty: 'animal cruelty',
  CD_Manipulative: 'manipulative',
  CD_SuddenOutbursts: 'sudden outbursts',

  // Dementia Block
  DEM_MemoryLoss: 'memory loss',
  DEM_Confusion: 'confusion',
  DEM_DifficultyWithAdls: 'difficulty with adls',
  DEM_Wandering: 'wandering',
  DEM_Agitation: 'agitation',
  DEM_Ah: 'ah',
  DEM_Vh: 'vh',
  DEM_ParkinsonSymptoms: 'parkinson symptoms',

  // Schizophrenia Block
  SCH_Hallucination: 'hallucination',
  SCH_Delusion: 'delusion',
  SCH_Disorganized: 'disorganized',
  SCH_Anhedonia: 'anhedonia',
  SCH_Avolition: 'avolition',
  SCH_Catatonia: 'catatonia',
  SCH_SuicidalThoughts: 'suicidal thoughts',
  SCH_HomicidalThoughts: 'homicidal thoughts',

  // Medication SE Block
  MED_GiUpset: 'gi upset',
  MED_SexualSe: 'sexual se',
  MED_WeightGain: 'weight gain',
  MED_Headache: 'headache',
  MED_Rash: 'rash',
  MED_HairLoss: 'hairLoss',
  MED_Dystonia: 'dystonia',
  MED_Akathesia: 'akathesia',
  MED_TardiveDyskinesia: 'tardive dyskinesia',
  MED_BlurredVision: 'blurred vision',
  MED_Drowsiness: 'drowsiness',
  MED_Dizzy: 'dizzy',
  MED_Other: 'medOther',

  // Other block
  HPI_Other: 'hpiOther',
}

const optionsValueToLabel: { [key: string]: string } = {
  //DELUSION_OPTIONS
  grandiose: 'grandiose',
  ofReference: 'of reference',
  erotomania: 'erotomania',
  persecutory: 'persecutory',
  jealous: 'jealous',
  bizarre: 'bizarre',
  mixed: 'mixed',
  nihilistic: 'nihilistic',
  thoughtBroadcasting: 'thought broadcasting',
  guilt: 'guilt',
  thoughtInsertion: 'thought insertion',
  persecution: 'persecution',
  unspecified: 'unspecified',
  infidelity: 'infidelity',
  Somatic: 'Somatic',
  misidentificationSyndrome: 'misidentification syndrome',
  auditory: 'auditory',
  visual: 'visual',
  Olfactory: 'olfactory',
  tactile: 'tactile',
  gustatory: 'gustatory',
}

export {
  assignSpecificFields,
  getInitialValues,
  valueToLabel,
  optionsValueToLabel,
}
