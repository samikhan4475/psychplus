import { QuestionnaireSchemaType } from '../shared/questionnaire-schema'

const categories = {
  attention: Array.from({ length: 5 }, (_, i) => `PscAttentionQ${i + 1}`),
  internalizing: Array.from(
    { length: 5 },
    (_, i) => `PscInternalizingQ${i + 1}`,
  ),
  externalizing: Array.from(
    { length: 7 },
    (_, i) => `PscExternalizingQ${i + 1}`,
  ),
}

const psc17Mapping: QuestionnaireSchemaType = Object.fromEntries(
  Object.values(categories)
    .flat()
    .map((question) => [question, '0']),
)

export { psc17Mapping }
