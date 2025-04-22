import { QuestionnaireSchemaType } from '../shared/questionnaire-schema'

const categories = {
  SuicidalIdeation: Array.from(
    { length: 5 },
    (_, i) => `suicidalIdeationQ${i + 1}`,
  ),
  SuicidalBehaviors: Array.from(
    { length: 5 },
    (_, i) => `suicidalBehaviorsQ${i + 6}`,
  ),
}

const cssrsMapping: QuestionnaireSchemaType = Object.fromEntries(
  Object.values(categories)
    .flat()
    .map((question) => [question, '']),
)

export { cssrsMapping }
