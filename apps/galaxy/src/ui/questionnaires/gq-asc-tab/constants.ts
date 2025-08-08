import { createQuestions } from './utils'

const GQ_ASC_LABELS = [
  'Questions',
  'Definitely disagree',
  'Slightly disagree',
  'Slightly Agree',
  'Definitely Agree',
]

const GQ_ASC_OPTIONS = [
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
]

const GQ_ASC_IMAGINATION_AND_PLAY = createQuestions(
  1,
  [
    '1. I enjoy fantasy worlds.',
    '2. I am interested in fiction.',
    '3. When I was 5-12 yo, I played as imaginatively as other girls.',
    '4. When I was 5-12 yo, I had imaginary friends/animals.',
    '5. When I was 5-12 yo, I created my own complex ‘set ups’ with toys.',
  ],
  GQ_ASC_OPTIONS,
)

const GQ_ASC_CAMOUFLAGING = createQuestions(
  6,
  [
    '6. I copy or ‘clone’ myself on other females.',
    '7. I avidly observe other females socializing.',
    '8. I am attracted to females with strong personalities who tell me what to do.',
    '9. I adopt a different persona in different situations',
  ],
  GQ_ASC_OPTIONS,
)

const GQ_ASC_SENSORY_SENSITIVITIES = createQuestions(
  10,
  [
    '10. I am attached to certain objects or toys (ex: toy, pillow, piece of cloth) which I carry, touch, or rub to calm myself.',
    '11. I expressed distress during grooming (ex: fight/cried during nail cutting, haircuts, combing) or when I am touched.',
    '12. Some social situations make me mute.',
    '13. I am distressed by certain smells, or I avoid certain tastes that are a typical part of a diet.',
  ],
  GQ_ASC_OPTIONS,
)

const GQ_ASC_SOCIALIZING = createQuestions(
  14,
  [
    '14. I socialize quite well for a while, but subsequently feel exhausted.',
    '15. I often have a facial ‘mask’ that hides my social confusion.',
    '16. I have intense emotions.',
    '17. I apologize when I make a social error.',
  ],
  GQ_ASC_OPTIONS,
)

const GQ_ASC_INTERESTS = createQuestions(
  18,
  [
    '18. When I was 5-12 yo, I preferred to play with girls’ toys.',
    '19. When I was 5-12 yo, I preferred to play with boys’ toys.',
    '20. My interests were advanced for my age (ex. opera).',
    '21. I am talented in music.',
  ],
  GQ_ASC_OPTIONS,
)

const GQ_ASC_TABLES = [
  {
    label: 'Imagination and Play',
    data: GQ_ASC_IMAGINATION_AND_PLAY,
  },
  {
    label: 'Camouflaging',
    data: GQ_ASC_CAMOUFLAGING,
  },
  {
    label: 'Sensory Sensitivities',
    data: GQ_ASC_SENSORY_SENSITIVITIES,
  },
  {
    label: 'Socializing',
    data: GQ_ASC_SOCIALIZING,
  },
  {
    label: 'Interests',
    data: GQ_ASC_INTERESTS,
  },
]

const TOTAL_QUESTIONS = 21

const SCORE_INTERPRETATION_RANGES = [
  { label: 'Low/No Autistic Traits', color: 'green', min: 21, max: 29 },
  { label: 'Moderate Autistic Traits', color: 'yellow', min: 30, max: 56 },
  { label: 'High level of Autistic Traits', color: 'red', min: 57, max: 84 },
]

export {
  GQ_ASC_OPTIONS,
  GQ_ASC_LABELS,
  GQ_ASC_CAMOUFLAGING,
  GQ_ASC_IMAGINATION_AND_PLAY,
  GQ_ASC_INTERESTS,
  GQ_ASC_SENSORY_SENSITIVITIES,
  GQ_ASC_SOCIALIZING,
  GQ_ASC_TABLES,
  TOTAL_QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
}
