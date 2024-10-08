const MOCA_LABELS = ['Give pt a written form and instruct them as follows']

const VISUOSPATIAL_EXECUTIVE = [
  {
    id: 'VisuospatialExecutiveQ1',
    value: 0,
    question: '1. Ask patient to trace the diagram in order',
    options: [
      { label: '+1 Completed Correctly', value: '1' },
      { label: '0 Not Completed', value: '0' },
    ],
  },
  {
    id: 'VisuospatialExecutiveQ2',
    value: 0,
    question: '2. Ask patient to copy cube',
    options: [
      { label: '+1 Completed Correctly', value: '1' },
      { label: '0 Not Completed', value: '0' },
    ],
  },
  {
    id: 'VisuospatialExecutiveQ3',
    value: 0,
    question: '3. Ask patient to draw a clock (ten past eleven)',
    options: [
      {
        label:
          '+3 Correctly drew all features (i.e., contour, numbers, and hands)',
        value: '3',
      },
      {
        label:
          '+2 Correctly drew two out of three features (i.e., two out of contour, numbers, and hands)',
        value: '2',
      },
      { label: '+1 Correctly drew contour only', value: '1-contour' },
      { label: '+1 Correctly drew numbers only', value: '1-numbers' },
      { label: '+1 Correctly drew hands only', value: '1-hands' },
      { label: '0 None of the above', value: '0' },
    ],
  },
]

const NAMING = [
  {
    id: 'NamingQ4',
    value: 0,
    question: '1. Ask patient to name the first animal',
    options: [
      { label: '+1 Named lion', value: '1' },
      { label: '0 Did not name lion', value: '0' },
    ],
  },
  {
    id: 'NamingQ5',
    value: 0,
    question: '2. Ask patient to name the second animal',
    options: [
      { label: '+1 Named rhinoceros', value: '1' },
      { label: '0 Did not name rhinoceros', value: '0' },
    ],
  },
  {
    id: 'NamingQ6',
    value: 0,
    question: '3. Ask patient to name the third animal',
    options: [
      {
        label: '+1 Named camel',
        value: '1',
      },
      {
        label: '0 Did not name camel',
        value: '0',
      },
    ],
  },
]

const ATTENTION = [
  {
    id: 'AttentionQ7',
    value: 0,
    question:
      '1. Read list of digits (2, 1, 8, 5, 4) at 1 digit/sec and ask patient to repeat them in the forward order',
    options: [
      { label: '+1 Repeated correctly', value: '1' },
      { label: '0 Did not Repeat correctly', value: '0' },
    ],
  },
  {
    id: 'AttentionQ8',
    value: 0,
    question:
      '2. Read list of digits (7, 4, 2) at 1 digit/sec and ask patient to repeat them in the backward order',
    options: [
      { label: '+1 Repeated correctly', value: '1' },
      { label: '0 Did not Repeat correctly', value: '0' },
    ],
  },
  {
    id: 'AttentionQ9',
    value: 0,
    question:
      '3. Read list of letters and ask patient to tap with their hand at each letter A: FBAC MNAA JKLB AFAK DEAA AJAM OFAAB',
    options: [
      {
        label: '+1 <2 errors',
        value: '1',
      },
      {
        label: '0 ≥2 errors',
        value: '0',
      },
    ],
  },
  {
    id: 'AttentionQ10',
    value: 0,
    isGrid: true,
    question:
      '4. Ask patient to do five serial 7 subtractions starting at 100; patient should say 93, 86, 79, 72, 65',
    options: [
      {
        label: '+3  4 or 5 correct',
        value: '3',
      },
      {
        label: '+2  2 or 3 correct',
        value: '2',
      },
      {
        label: '+1  1 correct',
        value: '1',
      },
      {
        label: '0  0 correct',
        value: '0',
      },
    ],
  },
]

const LANGUAGE = [
  {
    id: 'LanguageQ11',
    value: 0,
    question:
      '1. Read and ask patient to repeat: "I only know that John is the one to help today"',
    options: [
      { label: '+1 Repeated correctly', value: '1' },
      { label: '0 Did not Repeat correctly', value: '0' },
    ],
  },
  {
    id: 'LanguageQ12',
    value: 0,
    question:
      '2. Read and ask patient to repeat: "The cat always hid under the couch when dogs were in the room"',
    options: [
      { label: '+1 Repeated correctly', value: '1' },
      { label: '0 Did not Repeat correctly', value: '0' },
    ],
  },
  {
    id: 'LanguageQ13',
    value: 0,
    question:
      '3. Ask patient to name maximum number of words in 1 minute that begin with the letter F',
    options: [
      {
        label: '+1 Named ≥11 words',
        value: '1',
      },
      {
        label: '0 Named <11 words',
        value: '0',
      },
    ],
  },
]

const ABSTRACTION = [
  {
    id: 'AbstractionQ14',
    value: 0,
    question:
      '1. Ask patient similarity between train and bicycle (e.g. both are modes of transportation)',
    options: [
      { label: '+1 Answered correctly', value: '1' },
      { label: '0 Did not Answer correctly', value: '0' },
    ],
  },
  {
    id: 'AbstractionQ15',
    value: 0,
    question:
      '2. Ask patient similarity between watch and ruler (e.g. both are measuring tools)',
    options: [
      { label: '+1 Answered correctly', value: '1' },
      { label: '0 Did not Answer correctly', value: '0' },
    ],
  },
]

const MEMORY = [
  {
    id: 'Memory',
    value: 0,
    question:
      'Read "Face", "Velvet", "Church", "Daisy", "Red", and ask patient to repeat (do two trials and a recall later in exam)',
    options: [],
    description: 'Check all the recalled words',
  },
]

const DELAYEDRECALL = [
  {
    id: 'DelayedRecall',
    value: 0,
    question:
      '1. Ask patient to recall the words with no cue from the memory test previously conducted ("Face", "Velvet", "Church", "Daisy", "Red")',
    options: [],
    description: 'Check all the recalled words',
  },
]

const ORIENTATION = [
  {
    id: 'Orientation',
    value: 0,
    question: '1. Ask patient the date, month, year, day, place, and city',
    options: [],
    description: 'Check all correct answers',
  },
]

const MemoryHeading = ['Trial', 'Face', 'Velvet', 'Church', 'Daisy', 'Red']
const DelayedRecallHeading = ['', 'Face', 'Velvet', 'Church', 'Daisy', 'Red']
const OrientationHeading = ['Date', 'Month', 'Day', 'Place', 'City']
const MOCA_DENTAL_STATUS_OPTIONS = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
]

const SCORE_INTERPRETATION_RANGES_ORIENTATION = [
  {
    label: 'Abnormal',
    color: 'red',
    min: 0,
    max: 25,
  },
  {
    label: 'Normal',
    color: 'green',
    min: 26,
    max: 100,
    rangeTitle: '>26',
  },
]

const MOCA_TABLES = [
  {
    id: 'VisuospatialExecutive',
    label: 'Visuospatial / Executive',
    data: VISUOSPATIAL_EXECUTIVE,
    heading: [],
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: false,
  },
  {
    id: 'Naming',
    label: 'Naming',
    data: NAMING,
    heading: [],
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: false,
  },
  {
    id: 'Memory',
    label: 'Memory',
    data: MEMORY,
    heading: MemoryHeading,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: false,
  },
  {
    id: 'Attention',
    label: 'Attention',
    data: ATTENTION,
    heading: [],
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: true,
  },
  {
    id: 'Language',
    label: 'Language',
    data: LANGUAGE,
    heading: [],
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: true,
  },
  {
    id: 'Abstraction',
    label: 'Abstraction',
    data: ABSTRACTION,
    heading: [],
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: true,
  },

  {
    id: 'DelayedRecall',
    label: 'Delayed recall',
    data: DELAYEDRECALL,
    heading: DelayedRecallHeading,
    ScoreInterpretation: [],
    isRanges: false,
    isSameOptions: true,
    isWidthFifty: false,
  },
  {
    id: 'Orientation',
    label: 'Orientation',
    data: ORIENTATION,
    heading: OrientationHeading,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_ORIENTATION,
    isRanges: true,
    isSameOptions: true,
    isWidthFifty: false,
  },
]

export {
  MOCA_LABELS,
  MOCA_TABLES,
  MOCA_DENTAL_STATUS_OPTIONS,
  SCORE_INTERPRETATION_RANGES_ORIENTATION,
}
