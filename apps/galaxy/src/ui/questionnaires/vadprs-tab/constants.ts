const TOTAL_SCORE = 'totalScore'

const VADPRS_QUESTION_IDS = Object.fromEntries(
  Array.from({ length: 47 }, (_, i) => i + 1).map(q => [
    `Q${q}`,
    `VadprsQuestionsQ${q}`
  ])
)

const VADPRS_PERFORMANCE_QUESTION_IDS = Object.fromEntries(
  Array.from({ length: 8 }, (_, i) => i + 48).map(q => [
    `Q${q}`,
    `PerformanceEvaluationQ${q}`
  ])
)

const VADPRS_CHILD_EVALUATION = 'VadprsQuestionsChildEavaluationQ0'

const VADPRS_QUESTIONS_LABELS = [
  'Questions',
  'Never',
  'Occasionally',
  'Often',
  'Very Often',
]

const PERFORMANCE_EVALUATION_LABELS = [
  '',
  'Excellent',
  'Above Average',
  'Average',
  'Somewhat of problem',
  'Problematic',
]

const VADPRS_CHILD_EVALUATION_QUESTIONS = [
  {
    id: VADPRS_CHILD_EVALUATION,
    value: 0,
    question:
      'Is this evaluation based on a time when the child:',
  }
]

const VADPRS_CHILD_EVALUATION_OPTIONS = [
  { label: 'Was on medication', value: '0' },
  { label: 'Was not on medication', value: '1' },
  { label: 'Not sure', value: '2' },
]

const VADPRS_QUESTIONS = [
  {
    id: VADPRS_QUESTION_IDS.Q1,
    value: 0,
    question:
      '1. Does not pay attention to details or makes careless mistakes (e.g., in homework)',
  },
  {
    id: VADPRS_QUESTION_IDS.Q2,
    value: 0,
    question: '2. Has difficulty keeping attention on tasks',
  },
  {
    id: VADPRS_QUESTION_IDS.Q3,
    value: 0,
    question: '3. Does not seem to listen when spoken to directly',
  },
  {
    id: VADPRS_QUESTION_IDS.Q4,
    value: 0,
    question:
      '4. Does not follow through on instructions and fails to finish tasks',
  },
  {
    id: VADPRS_QUESTION_IDS.Q5,
    value: 0,
    question: '5. Has difficulty organizing tasks and activities',
  },
  {
    id: VADPRS_QUESTION_IDS.Q6,
    value: 0,
    question: '6. Avoids or dislikes tasks requiring sustained mental effort',
  },
  {
    id: VADPRS_QUESTION_IDS.Q7,
    value: 0,
    question: '7. Loses items necessary for tasks (e.g., toys, pencils, books)',
  },
  {
    id: VADPRS_QUESTION_IDS.Q8,
    value: 0,
    question: '8. Is easily distracted by external stimuli',
  },
  {
    id: VADPRS_QUESTION_IDS.Q9,
    value: 0,
    question: '9. Is forgetful in daily activities',
  },
  {
    id: VADPRS_QUESTION_IDS.Q10,
    value: 0,
    question: '10. Fidgets with hands or feet or squirms in seat',
  },
  {
    id: VADPRS_QUESTION_IDS.Q11,
    value: 0,
    question: '11. Leaves seat when staying seated is expected',
  },
  {
    id: VADPRS_QUESTION_IDS.Q12,
    value: 0,
    question:
      '12. Runs about or climbs excessively in inappropriate situations',
  },
  {
    id: VADPRS_QUESTION_IDS.Q13,
    value: 0,
    question: '13. Has difficulty engaging in quiet activities',
  },
  {
    id: VADPRS_QUESTION_IDS.Q14,
    value: 0,
    question: '14. Is "on the go" or acts as if "driven by a motor"',
  },
  {
    id: VADPRS_QUESTION_IDS.Q15,
    value: 0,
    question: '15. Talks excessively',
  },
  {
    id: VADPRS_QUESTION_IDS.Q16,
    value: 0,
    question: '16. Blurts out answers before questions are completed',
  },
  {
    id: VADPRS_QUESTION_IDS.Q17,
    value: 0,
    question: '17. Has difficulty waiting for their turn',
  },
  {
    id: VADPRS_QUESTION_IDS.Q18,
    value: 0,
    question: "18. Interrupts or intrudes on others' conversations/activities",
  },
  {
    id: TOTAL_SCORE,
    value: 0,
    question: 'Total Symptom Score (Q1–18)',
  },
  {
    id: VADPRS_QUESTION_IDS.Q19,
    value: 0,
    question: '19. Argues with adults',
  },
  {
    id: VADPRS_QUESTION_IDS.Q20,
    value: 0,
    question: '20. Loses temper',
  },
  {
    id: VADPRS_QUESTION_IDS.Q21,
    value: 0,
    question: "21. Actively defies or refuses to comply with adults' requests",
  },
  {
    id: VADPRS_QUESTION_IDS.Q22,
    value: 0,
    question: '22. Deliberately annoys others',
  },
  {
    id: VADPRS_QUESTION_IDS.Q23,
    value: 0,
    question: '23. Blames others for their mistakes or misbehavior',
  },
  {
    id: VADPRS_QUESTION_IDS.Q24,
    value: 0,
    question: '24. Is touchy or easily annoyed',
  },
  {
    id: VADPRS_QUESTION_IDS.Q25,
    value: 0,
    question: '25. Is angry or resentful',
  },
  {
    id: VADPRS_QUESTION_IDS.Q26,
    value: 0,
    question: '26. Is spiteful and seeks revenge',
  },
  {
    id: VADPRS_QUESTION_IDS.Q27,
    value: 0,
    question: '27. Bullies, threatens, or intimidates others',
  },
  {
    id: VADPRS_QUESTION_IDS.Q28,
    value: 0,
    question: '28. Initiates physical fights',
  },
  {
    id: VADPRS_QUESTION_IDS.Q29,
    value: 0,
    question: '29. Lies to avoid obligations or to get out of trouble',
  },
  {
    id: VADPRS_QUESTION_IDS.Q30,
    value: 0,
    question: '30. Skips school without permission',
  },
  {
    id: VADPRS_QUESTION_IDS.Q31,
    value: 0,
    question: '31. Is physically cruel to others',
  },
  {
    id: VADPRS_QUESTION_IDS.Q32,
    value: 0,
    question: '32. Steals items of value',
  },
  {
    id: VADPRS_QUESTION_IDS.Q33,
    value: 0,
    question: "33. Deliberately destroys others' property",
  },
  {
    id: VADPRS_QUESTION_IDS.Q34,
    value: 0,
    question: '34. Has used dangerous weapons (e.g., bat, knife, brick, gun)',
  },
  {
    id: VADPRS_QUESTION_IDS.Q35,
    value: 0,
    question: '35. Is physically cruel to animals',
  },
  {
    id: VADPRS_QUESTION_IDS.Q36,
    value: 0,
    question: '36. Has deliberately set fires',
  },
  {
    id: VADPRS_QUESTION_IDS.Q37,
    value: 0,
    question: '37. Has broken into homes, businesses, or vehicles',
  },
  {
    id: VADPRS_QUESTION_IDS.Q38,
    value: 0,
    question: '38. Stays out at night without permission',
  },
  {
    id: VADPRS_QUESTION_IDS.Q39,
    value: 0,
    question: '39. Has run away from home overnight',
  },
  {
    id: VADPRS_QUESTION_IDS.Q40,
    value: 0,
    question: '40. Has forced someone into sexual activity',
  },
  {
    id: VADPRS_QUESTION_IDS.Q41,
    value: 0,
    question: '41. Is fearful, anxious, or worried',
  },
  {
    id: VADPRS_QUESTION_IDS.Q42,
    value: 0,
    question: '42. Avoids new things out of fear of mistakes',
  },
  {
    id: VADPRS_QUESTION_IDS.Q43,
    value: 0,
    question: '43. Feels worthless or inferior',
  },
  {
    id: VADPRS_QUESTION_IDS.Q44,
    value: 0,
    question: '44. Blames self or feels guilty',
  },
  {
    id: VADPRS_QUESTION_IDS.Q45,
    value: 0,
    question: '45. Feels lonely or unloved',
  },
  {
    id: VADPRS_QUESTION_IDS.Q46,
    value: 0,
    question: '46. Is sad or depressed',
  },
  {
    id: VADPRS_QUESTION_IDS.Q47,
    value: 0,
    question: '47. Is self-conscious or easily embarrassed',
  },
]

const VADPRS_PERFORMANCE_EVALUATION = [
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q48,
    value: 0,
    question: '48. Overall school performance',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q49,
    value: 0,
    question: '49. Reading',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q50,
    value: 0,
    question: '50. Writing',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q51,
    value: 0,
    question: '51. Mathematics',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q52,
    value: 0,
    question: '52. Relationship with parents',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q53,
    value: 0,
    question: '53. Relationship with siblings',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q54,
    value: 0,
    question: '54. Relationship with peers',
  },
  {
    id: VADPRS_PERFORMANCE_QUESTION_IDS.Q55,
    value: 0,
    question: '55. Participation in organized activities (e.g., sports teams)',
  },
]

const VADPRS_OPTIONS = [
  { label: '0', value: '0' },
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
]

const VADPRS_PERFORMANCE_EVALUATION_OPTIONS = [
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
  { label: '+5', value: '5' },
]

const SCORE_INTERPRETATION = [
  {
    title: 'Predominantly Inattentive Subtype',
    descriptions: [
      '≥6/9 items (Q1–9) scored 2–3',
      '≥1 performance item (Q48–55) scored 4–5',
    ],
  },
  {
    title: 'Predominantly Hyperactive/Impulsive Subtype',
    descriptions: [
      '≥6/9 items (Q10–18) scored 2–3',
      '≥1 performance item (Q48–55) scored 4–5',
    ],
  },
  {
    title: 'Combined Inattention/Hyperactivity Subtype',
    descriptions: ['Meets both Inattentive & Hyperactive/Impulsive criteria'],
  },
  {
    title: 'Oppositional-Defiant Disorder Screen',
    descriptions: [
      '≥4/8 items (Q19–26) scored 2–3',
      '≥1 performance item (Q48–55) scored 4–5',
    ],
  },
  {
    title: 'Conduct Disorder Screen',
    descriptions: [
      '≥3/14 items (Q27–40) scored 2–3',
      '≥1 performance item (Q48–55) scored 4–5',
    ],
  },
  {
    title: 'Anxiety/Depression Screen',
    descriptions: [
      '≥3/7 items (Q41–47) scored 2–3',
      '≥1 performance item (Q48–55) scored 4–5',
    ],
  },
]

const VADPRS_TABLE = [
  {
    labels: VADPRS_QUESTIONS_LABELS,
    data: VADPRS_QUESTIONS,
    options: VADPRS_OPTIONS
  },
  {
    labels: PERFORMANCE_EVALUATION_LABELS,
    data: VADPRS_PERFORMANCE_EVALUATION,
    options: VADPRS_PERFORMANCE_EVALUATION_OPTIONS
  }
]

export {
  PERFORMANCE_EVALUATION_LABELS,
  SCORE_INTERPRETATION,
  TOTAL_SCORE,
  VADPRS_OPTIONS,
  VADPRS_PERFORMANCE_EVALUATION,
  VADPRS_PERFORMANCE_EVALUATION_OPTIONS,
  VADPRS_PERFORMANCE_QUESTION_IDS,
  VADPRS_QUESTION_IDS,
  VADPRS_QUESTIONS,
  VADPRS_QUESTIONS_LABELS,
  VADPRS_TABLE,
  VADPRS_CHILD_EVALUATION_QUESTIONS,
  VADPRS_CHILD_EVALUATION_OPTIONS,
  VADPRS_CHILD_EVALUATION
}
