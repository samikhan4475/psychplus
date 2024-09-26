import options from './options.json'

const OPTIONS = options

const LABELS = [
  'For each item select the one “cue” which best characterizes the patient',
  '0',
  '+1',
  '+2',
  '+3',
  '+4',
]

const SCORE_INTERPRETATION_RANGES = [
  { label: 'Normal', color: 'white', min: 0, max: 7 },
  { label: 'Mild depression', color: 'green', min: 8, max: 17 },
  {
    label: 'Moderate depression',
    color: 'yellow',
    min: 18,
    max: 24,
  },
  {
    label: 'Severe depression',
    color: 'red',
    min: 25,
    max: 100,
    rangeTitle: '>25',
  },
]

const QUESTIONS = [
  'DEPRESSED MOOD (sadness, hopeless, helpless, worthless)',
  'FEELINGS OF GUILT',
  'SUICIDE',
  'INSOMNIA: EARLY IN THE NIGHT',
  'INSOMNIA: MIDDLE OF THE NIGHT',
  'INSOMNIA: EARLY HOURS OF THE MORNING',
  'WORK AND ACTIVITIES',
  'RETARDATION (slowness of thought and speech, impaired ability to concentrate, decreased motor activity)',
  'AGITATION',
  'ANXIETY PSYCHIC',
  'ANXIETY SOMATIC (physiological concomitants of anxiety) such as: gastro-intestinal – dry mouth, wind, indigestion, diarrhea, cramps, belching cardio-vascular – palpitations, headaches respiratory – hyperventilation, sighing urinary frequency sweating',
  'SOMATIC SYMPTOMS GASTRO-INTESTINAL',
  'GENERAL SOMATIC SYMPTOMS',
  'GENITAL SYMPTOMS (symptoms such as loss of libido, menstrual disturbances)',
  'HYPOCHONDRIASIS',
  'LOSS OF WEIGHT',
  'INSIGHT',
].map((question, index) => {
  return {
    id: `Q${index + 1}`,
    question,
    value: 0,
    options: OPTIONS[index],
  }
})

export { SCORE_INTERPRETATION_RANGES, LABELS, QUESTIONS }
