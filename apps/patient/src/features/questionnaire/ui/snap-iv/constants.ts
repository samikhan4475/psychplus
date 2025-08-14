const LABELS = [
  'For each item, check the column which best describes this child/adolescent:',
  'Not at all',
  'Just a Little',
  'Quite a Bit',
  'Very Much',
]

const QUESTION_CATEGORIES = [
  {
    heading: 'Inattention',
    questions: [
      'Often fails to give close attention to details or makes careless mistakes in schoolwork or tasks.',
      'Often has difficulty sustaining attention in tasks or play activities.',
      'Often does not seem to listen when spoken to directly.',
      'Often does not follow through on instructions and fails to finish schoolwork, chores, or duties.',
      'Often has difficulty organizing tasks and activities.',
      'Often avoids, dislikes, or reluctantly engages in tasks requiring sustained mental effort.',
      'Often loses things necessary for tasks or activities (e.g., toys, school assignments, pencils, or books.)',
      'Often is distracted by extraneous stimuli.',
      'Often is forgetful in daily activities.',
    ],
  },
  {
    heading: 'Hyperactivity/Impulsivity',
    questions: [
      'Often fidgets with hands or feet or squirms in seat.',
      'Often leaves seat in classroom or in other situations in which remaining seated is expected.',
      'Often runs or climbs excessively in situations in which it is inappropriate.',
      'Often has difficulty playing or engaging in leisure activities quietly.',
      'Often is "on the go" or acts as if "driven by a motor."',
      'Often talks excessively.',
      'Often blurts out answers before questions have been completed.',
      'Often has difficulty awaiting turn.',
      'Often interrupts or intrudes on others (e.g., butts into conversations or games).',
    ],
  },
  {
    heading: 'Opposition/Defiance',
    questions: [
      'Often loses temper.',
      'Often argues with adults.',
      'Often actively defies or refuses adult requests or rules.',
      'Often deliberately does things that annoy other people.',
      'Often blames others for his/her mistakes or misbehaviors.',
      'Often touchy or easily annoyed by others.',
      'Often is angry and resentful.',
      'Often is spiteful or vindictive.',
    ],
  },
]

const QUESTIONS = QUESTION_CATEGORIES.flatMap(
  ({ heading, questions }, categoryIndex) =>
    questions.map((question, index) => ({
      ...(index === 0 ? { headingLabels: [heading] } : {}),
      id: `${heading}Q${index + 1 + categoryIndex * 9}`,
      value: 0,
      question,
      options: [
        { label: '', value: '0' },
        { label: '', value: '1' },
        { label: '', value: '2' },
        { label: '', value: '3' },
      ],
    })),
)

export { QUESTIONS, LABELS }
