import { z } from 'zod'

type CssrsSchemaType = {
  [key: string]: string
}

const cssrsSchema = z.object({
  suicidalIdeationQ1: z.string().nullable(),
  suicidalIdeationQ2: z.string().nullable(),
  suicidalIdeationQ3: z.string().nullable(),
  suicidalIdeationQ4: z.string().nullable(),
  suicidalIdeationQ5: z.string().nullable(),
  suicidalBehaviorsQ6: z.string().nullable(),
  suicidalBehaviorsQ7: z.string().nullable(),
  suicidalBehaviorsQ8: z.string().nullable(),
  suicidalBehaviorsQ9: z.string().nullable(),
  suicidalBehaviorsQ10: z.string().nullable(),
})

export { cssrsSchema, type CssrsSchemaType }
