import { NoteData, Option } from '@/features/note/types'

const LABELS = ['Give pt a written form and instruct them as follows']

const createQuestion = (
  id: string,
  question: string,
  options: Option[],
): NoteData => ({
  id,
  value: 0,
  question,
  options,
})

const createOptions = (...labels: [string, string][]): Option[] =>
  labels.map(([label, value]) => ({ label, value }))

const VISUOSPATIAL_EXECUTIVE = [
  {
    headingLabels: ['Visuospatial / Executive'],
    ...createQuestion(
      'VisuospatialExecutiveQ1',
      '1. Ask patient to trace the diagram in order',
      createOptions(['Completed Correctly', '1'], ['Not Completed', '0']),
    ),
  },
  createQuestion(
    'VisuospatialExecutiveQ2',
    '2. Ask patient to copy cube',
    createOptions(['Completed Correctly', '1'], ['Not Completed', '0']),
  ),
  createQuestion(
    'VisuospatialExecutiveQ3',
    '3. Ask patient to draw a clock (ten past eleven)',
    createOptions(
      ['Correctly drew all features (i.e., contour, numbers, and hands)', '3'],
      ['Correctly drew two out of three features', '2'],
      ['Correctly drew contour only', '1-contour'],
      ['Correctly drew numbers only', '1-numbers'],
      ['Correctly drew hands only', '1-hands'],
      ['None of the above', '0'],
    ),
  ),
]

const NAMING = [
  {
    headingLabels: ['Naming'],
    ...createQuestion(
      'NamingQ4',
      '1. Ask patient to name the first animal',
      createOptions(['Named lion', '1'], ['Did not name lion', '0']),
    ),
  },
  createQuestion(
    'NamingQ5',
    '2. Ask patient to name the second animal',
    createOptions(['Named rhinoceros', '1'], ['Did not name rhinoceros', '0']),
  ),
  createQuestion(
    'NamingQ6',
    '3. Ask patient to name the third animal',
    createOptions(['Named camel', '1'], ['Did not name camel', '0']),
  ),
]

const ATTENTION = [
  {
    headingLabels: ['Attention'],
    ...createQuestion(
      'AttentionQ7',
      '1. Read list of digits (2, 1, 8, 5, 4) at 1 digit/sec and ask patient to repeat them in forward order',
      createOptions(
        ['Repeated correctly', '1'],
        ['Did not Repeat correctly', '0'],
      ),
    ),
  },
  createQuestion(
    'AttentionQ8',
    '2. Read list of digits (7, 4, 2) at 1 digit/sec and ask patient to repeat them in backward order',
    createOptions(
      ['Repeated correctly', '1'],
      ['Did not Repeat correctly', '0'],
    ),
  ),
  createQuestion(
    'AttentionQ9',
    '3. Read list of letters and ask patient to tap with their hand at each letter A: FBAC MNAA JKLB AFAK DEAA AJAM OFAAB',
    createOptions(['<2 errors', '1'], ['≥2 errors', '0']),
  ),
  createQuestion(
    'AttentionQ10',
    '4. Ask patient to do five serial 7 subtractions starting at 100; patient should say 93, 86, 79, 72, 65',
    createOptions(
      ['4 or 5 correct', '3'],
      ['2 or 3 correct', '2'],
      ['1 correct', '1'],
      ['0 correct', '0'],
    ),
  ),
]

const LANGUAGE = [
  {
    headingLabels: ['Language'],
    ...createQuestion(
      'LanguageQ11',
      '1. Read and ask patient to repeat: "I only know that John is the one to help today"',
      createOptions(
        ['Repeated correctly', '1'],
        ['Did not Repeat correctly', '0'],
      ),
    ),
  },
  createQuestion(
    'LanguageQ12',
    '2. Read and ask patient to repeat: "The cat always hid under the couch when dogs were in the room"',
    createOptions(
      ['Repeated correctly', '1'],
      ['Did not Repeat correctly', '0'],
    ),
  ),
  createQuestion(
    'LanguageQ13',
    '3. Ask patient to name maximum number of words in 1 minute that begin with the letter F',
    createOptions(['Named ≥11 words', '1'], ['Named <11 words', '0']),
  ),
]

const ABSTRACTION = [
  {
    headingLabels: ['Abstraction'],
    ...createQuestion(
      'AbstractionQ14',
      '1. Ask patient similarity between train and bicycle (e.g. both are modes of transportation)',
      createOptions(
        ['Answered correctly', '1'],
        ['Did not Answer correctly', '0'],
      ),
    ),
  },
  createQuestion(
    'AbstractionQ15',
    '2. Ask patient similarity between watch and ruler (e.g. both are measuring tools)',
    createOptions(
      ['Answered correctly', '1'],
      ['Did not Answer correctly', '0'],
    ),
  ),
]

const MEMORY_LABELS = ['Face', 'Velvet', 'Church', 'Daisy', 'Red']
const MEMORY_HEADING = `Read "Face", "Velvet", "Church", "Daisy", "Red", and ask patient to repeat (do two trials and a recall later in exam)`

const MEMORY_HEADING_LABELS = ['1st Trial', '2nd Trial']

const MEMORY = [
  {
    id: 'MemoryFaceQ1',
    value: 0,
  },
  {
    id: 'MemoryVelvetQ1',
    value: 0,
  },
  {
    id: 'MemoryChurchQ1',
    value: 0,
  },
  {
    id: 'MemoryDaisyQ1',
    value: 0,
  },
  {
    id: 'MemoryRedQ1',
    value: 0,
  },
  {
    id: 'MemoryFaceQ2',
    value: 0,
  },
  {
    id: 'MemoryVelvetQ2',
    value: 0,
  },
  {
    id: 'MemoryChurchQ2',
    value: 0,
  },
  {
    id: 'MemoryDaisyQ2',
    value: 0,
  },
  {
    id: 'MemoryRedQ2',
    value: 0,
  },
]

const DELAYED_RECALL = [
  {
    id: 'DelayedRecallFaceQ1',
    value: 0,
  },
  {
    id: 'DelayedRecallVelvetQ1',
    value: 0,
  },
  {
    id: 'DelayedRecallChurchQ1',
    value: 0,
  },
  {
    id: 'DelayedRecallDaisyQ1',
    value: 0,
  },
  {
    id: 'DelayedRecallRedQ1',
    value: 0,
  },
  {
    id: 'DelayedRecallFaceQ2',
    value: 0,
  },
  {
    id: 'DelayedRecallVelvetQ2',
    value: 0,
  },
  {
    id: 'DelayedRecallChurchQ2',
    value: 0,
  },
  {
    id: 'DelayedRecallDaisyQ2',
    value: 0,
  },
  {
    id: 'DelayedRecallRedQ2',
    value: 0,
  },
]

const DELAYED_RECALL_HEADING = `1. Ask patient to recall the words with no cue from the memory test previously conducted ("Face", "Velvet", "Church", "Daisy", "Red")`

const ORIENTATION = [
  {
    id: 'OrientationDateQ1',
    value: 0,
  },
  {
    id: 'OrientationMonthQ1',
    value: 0,
  },
  {
    id: 'OrientationDayQ1',
    value: 0,
  },
  {
    id: 'OrientationPlaceQ1',
    value: 0,
  },
  {
    id: 'OrientationCityQ1',
    value: 0,
  },
]

const ORIENTATION_LABELS = ['Date', 'Month', 'Day', 'Place', 'City']

const ORIENTATION_HEADING =
  '1. Ask patient the date, month, year, day, place, and city'

const QUESTIONS = [
  ...VISUOSPATIAL_EXECUTIVE,
  ...NAMING,
  ...MEMORY,
  ...ATTENTION,
  ...LANGUAGE,
  ...ABSTRACTION,
  ...DELAYED_RECALL,
  ...ORIENTATION,
]

export {
  LABELS,
  QUESTIONS,
  VISUOSPATIAL_EXECUTIVE,
  NAMING,
  ATTENTION,
  LANGUAGE,
  ABSTRACTION,
  MEMORY_LABELS,
  MEMORY_HEADING,
  MEMORY,
  DELAYED_RECALL,
  ORIENTATION,
  DELAYED_RECALL_HEADING,
  MEMORY_HEADING_LABELS,
  ORIENTATION_HEADING,
  ORIENTATION_LABELS,
}
