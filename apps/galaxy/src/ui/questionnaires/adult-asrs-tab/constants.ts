const Adult_ASRS_LABELS = [
  'Questions',
  'Never',
  'Rarely',
  'Sometimes',
  'Often',
  'Very Often',
]

const SCORE_INTERPRETATION_RANGES_PART_A = [
  {
    label: 'Low',
    color: 'white',
    min: 0,
    max: 9,
    rangeTitle: '<9',
  },
  { label: 'Mild to Moderate', color: 'green', min: 10, max: 13 },
  { label: 'High', color: 'yellow', min: 14, max: 17 },
  {
    label: 'Very high',
    color: 'red',
    min: 18,
    max: 55,
    rangeTitle: '18 or more points',
  },
]

const SCORE_INTERPRETATION_RANGES_PART_B = [
  {
    label: 'Low',
    color: 'white',
    min: 0,
    max: 19,
    rangeTitle: '<19',
  },
  { label: 'Mild to Moderate', color: 'green', min: 20, max: 26 },
  { label: 'High', color: 'yellow', min: 27, max: 32 },
  {
    label: 'Very high',
    color: 'red',
    min: 33,
    max: 55,
    rangeTitle: '33 or more points',
  },
]

const TOTAL_SCORE_INTERPRETATION_RANGES_PARTS = [
  {
    label: 'Low',
    color: 'white',
    min: 0,
    max: 30,
    rangeTitle: '30 or less',
  },
  {
    label: 'Mild to Moderate',
    color: 'green',
    min: 31,
    max: 39,
    rangeTitle: '31 or 39',
  },
  { label: 'High', color: 'yellow', min: 40, max: 49 },
  {
    label: 'Very High',
    color: 'red',
    min: 50,
    max: 90,
    rangeTitle: '50 or more points',
  },
]

const ADULT_ASRS_QUESTIONS_PART_A = [
  {
    id: 'AdultASRSPartAQ1',
    value: 0,
    question:
      '1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
  },
  {
    id: 'AdultASRSPartAQ2',
    value: 0,
    question:
      '2. How often do you have difficulty getting things in order when you have to do a task that requires organization?',
  },
  {
    id: 'AdultASRSPartAQ3',
    value: 0,
    question:
      '3. How often do you have problems remembering appointments or obligations?',
  },
  {
    id: 'AdultASRSPartAQ4',
    value: 0,
    question:
      '4. When you have a task that requires a lot thought, how often do you avoid or delay getting started?',
  },
  {
    id: 'AdultASRSPartAQ5',
    value: 0,
    question:
      '5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
  },
  {
    id: 'AdultASRSPartAQ6',
    value: 0,
    question:
      '6. How often do you feel overly active and compelled to do things, like you were driven by a motor?',
  },
]
const ADULT_ASRS_QUESTIONS_PART_B = [
  {
    id: 'AdultASRSPartBQ1',
    value: 0,
    question:
      '7. How often do you make careless mistakes when you have to work on a boring or difficult project?',
  },
  {
    id: 'AdultASRSPartBQ2',
    value: 0,
    question:
      '8. How often do you have difficulty keeping your attention when you are doing boring or repetitive work? ',
  },
  {
    id: 'AdultASRSPartBQ3',
    value: 0,
    question:
      '9. How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',
  },
  {
    id: 'AdultASRSPartBQ4',
    value: 0,
    question:
      '10. How often do you misplace or have difficulty finding things at home or at work?',
  },
  {
    id: 'AdultASRSPartBQ5',
    value: 0,
    question:
      '11. How often are you distracted by activity or noise around you?',
  },
  {
    id: 'AdultASRSPartBQ6',
    value: 0,
    question:
      '12. How often do you leave your seat in meetings or other situations in which you are expected to remain seated?',
  },
  {
    id: 'AdultASRSPartBQ7',
    value: 0,
    question: '13. How often do you feel restless or fidgety?',
  },
  {
    id: 'AdultASRSPartBQ8',
    value: 0,
    question:
      '14. How often do you have difficulty unwinding and relaxing when you have time to yourself?',
  },
  {
    id: 'AdultASRSPartBQ9',
    value: 0,
    question:
      '15. How often do you find yourself talking too much when you are in social situations?',
  },
  {
    id: 'AdultASRSPartBQ10',
    value: 0,
    question:
      '16. When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?',
  },
  {
    id: 'AdultASRSPartBQ11',
    value: 0,
    question:
      '17. How often do you have difficulty waiting your turn in situations when turn taking is required?',
  },
  {
    id: 'AdultASRSPartBQ12',
    value: 0,
    question: '18. How often do you interrupt others when they are busy?',
  },
]

const ADULT_ASRS_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
]

enum ADULT_ASRS_SECTIONS {
  PartA = 'Part-A',
  PartB = 'PART-B',
}

const ADULT_ASRS_TABLES = [
  {
    id: 'PartA',
    label: ADULT_ASRS_SECTIONS.PartA,
    data: ADULT_ASRS_QUESTIONS_PART_A,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_PART_A,
    subHeading:
      'Scores indicates whether pt meets DSM criteria for ADHD, scores 14 or above are considered clinically significant.',
  },

  {
    id: 'PartB',
    label: ADULT_ASRS_SECTIONS.PartB,
    data: ADULT_ASRS_QUESTIONS_PART_B,
    ScoreInterpretation: SCORE_INTERPRETATION_RANGES_PART_B,
    subHeading:
      'Scores indicates impact and severity of symptoms, scores 27 or above are considered clinically significant.',
  },
]

export {
  ADULT_ASRS_OPTIONS,
  Adult_ASRS_LABELS,
  SCORE_INTERPRETATION_RANGES_PART_A,
  SCORE_INTERPRETATION_RANGES_PART_B,
  ADULT_ASRS_QUESTIONS_PART_A,
  ADULT_ASRS_QUESTIONS_PART_B,
  ADULT_ASRS_TABLES,
  ADULT_ASRS_SECTIONS,
  TOTAL_SCORE_INTERPRETATION_RANGES_PARTS,
}
