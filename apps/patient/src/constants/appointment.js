import { MapPin, Video } from 'lucide-react'

const VISIT_TYPES = { IN_PERSON: 'In-Person', VIRTUAL: 'virtual' }

const VISIT_TYPE_OPTIONS = [
  {
    label: 'Virtual',
    value: VISIT_TYPES.VIRTUAL,
    icon: <Video className="h-4 w-4" />,
  },
  {
    label: 'In-Person',
    value: VISIT_TYPES.IN_PERSON,
    icon: <MapPin className="h-4 w-4" />,
  },
]

const SERVICE_TYPES = {
  PSYCHIATRY: 'Psychiatry',
  TALK_THERAPY: 'Therapy',
  FAMILY_COUPLES_THERAPY: 'CouplesFamilyTherapy',
  SUBOXONE_MAT: 'SuboxoneMat',
}

const SERVICE_TYPE_OPTIONS = [
  { label: 'Psychiatry (Medications)', value: SERVICE_TYPES.PSYCHIATRY },
  { label: 'Talk Therapy', value: SERVICE_TYPES.TALK_THERAPY },
  {
    label: 'Family/Couples Therapy',
    value: SERVICE_TYPES.FAMILY_COUPLES_THERAPY,
  },
  { label: 'Suboxone/MAT', value: SERVICE_TYPES.SUBOXONE_MAT },
]

const SORT_TYPES = {
  MILEAGE: 'Mileage',
  NEXT_AVAILABLE: 'NextAvailable',
  RATING: 'Rating',
  BEST_OPTION: 'BestOption',
}

const SORT_OPTIONS = [
  { label: 'Mileage', value: SORT_TYPES.MILEAGE },
  { label: 'Next Available', value: SORT_TYPES.NEXT_AVAILABLE },
  { label: 'Rating', value: SORT_TYPES.RATING },
  { label: 'Best Option', value: SORT_TYPES.BEST_OPTION },
]

const PSYCHIATRIST_OPTIONS = [
  { label: 'Personality Disorders', value: 'personality-disorders' },
  { label: 'Schizophrenia', value: 'schizophrenia' },
  { label: 'Bipolar', value: 'bipolar' },
  {
    label: 'Treatment Resistant Depression',
    value: 'treatment-resistant-depression',
  },
  { label: 'OCD', value: 'ocd' },
  { label: 'PTSD', value: 'ptsd' },
  { label: 'Neonatal', value: 'neonatal' },
  { label: 'Addiction', value: 'addiction' },
  { label: 'Child & Adolescent', value: 'child-adolescent' },
  { label: 'Forensic', value: 'forensic' },
  { label: 'Geriatric', value: 'geriatric' },
  { label: 'Women’s Health', value: 'womens-health' },
  { label: 'TMS', value: 'tms' },
  { label: 'Spravato', value: 'spravato' },
  { label: 'ECT', value: 'ect' },
]

const THERAPIST_OPTIONS = [
  {
    label: 'Acceptance and Commitment Therapy',
    value: 'acceptance-and-commitment-therapy',
  },
  { label: 'Adlerian Therapy', value: 'adlerian-therapy' },
  { label: 'Anger Management', value: 'anger-management' },
  { label: 'Attachment-Based Therapy', value: 'attachment-based-therapy' },
  { label: 'Brief Psychotherapy', value: 'brief-psychotherapy' },
  { label: 'Coaching', value: 'coaching' },
  {
    label: 'Cognitive Behavioral Therapy',
    value: 'cognitive-behavioral-therapy',
  },
  {
    label: 'Cognitive Processing Therapy',
    value: 'cognitive-processing-therapy',
  },
  {
    label: 'Compassion-Focused Therapy (CFT)',
    value: 'compassion-focused-therapy',
  },
  { label: 'Couples Therapy', value: 'couples-therapy' },
  { label: 'Crisis Counseling', value: 'crisis-counseling' },
  {
    label: 'Dialectical Behavior Therapy',
    value: 'dialectical-behavior-therapy',
  },
  { label: 'Eclectic Therapy', value: 'eclectic-therapy' },
  { label: 'EMDR', value: 'emdr' },
  { label: 'Existential Therapy', value: 'existential-therapy' },
  {
    label: 'Exposure and Response Prevention',
    value: 'exposure-and-response-prevention',
  },
  { label: 'Family Systems', value: 'family-systems' },
  { label: 'Family Therapy', value: 'family-therapy' },
  { label: 'Gestalt Therapy', value: 'gestalt-therapy' },
  { label: 'Grief Therapy', value: 'grief-therapy' },
  { label: 'Group Therapy', value: 'group-therapy' },
  { label: 'Humanistic Approach', value: 'humanistic-approach' },
  { label: 'Internal Family Systems', value: 'internal-family-systems' },
  {
    label: 'Interpersonal Psychotherapy',
    value: 'interpersonal-psychotherapy',
  },
  {
    label: 'Mindfulness-Based Cognitive Therapy',
    value: 'mindfulness-based-cognitive-therapy',
  },
  { label: 'Mindfulness-Based Therapy', value: 'mindfulness-based-therapy' },
  { label: 'Motivational Interviewing', value: 'motivational-interviewing' },
  { label: 'Narrative Therapy', value: 'narrative-therapy' },
  {
    label: 'Parent Child Interaction Therapy',
    value: 'parent-child-interaction-therapy',
  },
  { label: 'Person-Centered Therapy', value: 'person-centered-therapy' },
  { label: 'Play Therapy', value: 'play-therapy' },
  { label: 'Positive Psychology', value: 'positive-psychology' },
  { label: 'Prolonged Exposure Therapy', value: 'prolonged-exposure-therapy' },
  { label: 'Psychoanalytic Therapy', value: 'psychoanalytic-therapy' },
  { label: 'Psychodrama', value: 'psychodrama' },
  { label: 'Psychodynamic Therapy', value: 'psychodynamic-therapy' },
  {
    label: 'Psychological Testing and Evaluation',
    value: 'psychological-testing-and-evaluation',
  },
  {
    label: 'Rational Emotive Behavior Therapy',
    value: 'rational-emotive-behavior-therapy',
  },
  { label: 'Reality Therapy', value: 'reality-therapy' },
  { label: 'Relational Therapy', value: 'relational-therapy' },
  {
    label: 'Sensory Integration Therapy',
    value: 'sensory-integration-therapy',
  },
  {
    label: 'Solution-Focused Brief Therapy',
    value: 'solution-focused-brief-therapy',
  },
  { label: 'Strength-Based Therapy', value: 'strength-based-therapy' },
  { label: 'Structural Family Therapy', value: 'structural-family-therapy' },
  { label: 'Supportive Therapy', value: 'supportive-therapy' },
  { label: 'The Gottman Method', value: 'the-gottman-method' },
  { label: 'Transactional Analysis (TA)', value: 'transactional-analysis' },
  { label: 'Trauma Therapy', value: 'trauma-therapy' },
  {
    label: 'Trauma-Focused Cognitive Behavior',
    value: 'trauma-focused-cognitive-behavior',
  },
  { label: 'Virtual Reality (VR)', value: 'virtual-reality' },
  { label: 'Other', value: 'other' },
]

export {
  VISIT_TYPES,
  VISIT_TYPE_OPTIONS,
  SERVICE_TYPES,
  SERVICE_TYPE_OPTIONS,
  SORT_TYPES,
  SORT_OPTIONS,
  PSYCHIATRIST_OPTIONS,
  THERAPIST_OPTIONS,
}
