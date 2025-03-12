import { QuestionnaireSchemaType } from '../shared/questionnaire-schema'

const categories = {
  Inattention: Array.from({ length: 9 }, (_, i) => `InattentionQ${i + 1}`),
  'Hyperactivity/Impulsivity': Array.from(
    { length: 9 },
    (_, i) => `Hyperactivity/ImpulsivityQ${i + 10}`,
  ),
  'Opposition/Defiance': Array.from(
    { length: 8 },
    (_, i) => `Opposition/DefianceQ${i + 19}`,
  ),
}

const snapIvMapping: QuestionnaireSchemaType = Object.fromEntries(
  Object.values(categories)
    .flat()
    .map((question) => [question, '0']),
)

export { snapIvMapping }
