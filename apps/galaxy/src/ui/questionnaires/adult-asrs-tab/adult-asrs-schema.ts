import { z } from 'zod'

type AdultASRSSchemaType = {
  [key: string]: string
}

const adultASRSSchema = z.object({
  AdultASRSPartAQ1: z.string().nullable(),
  AdultASRSPartAQ2: z.string().nullable(),
  AdultASRSPartAQ3: z.string().nullable(),
  AdultASRSPartAQ4: z.string().nullable(),
  AdultASRSPartAQ5: z.string().nullable(),
  AdultASRSPartAQ6: z.string().nullable(),
  AdultASRSPartBQ1: z.string().nullable(),
  AdultASRSPartBQ2: z.string().nullable(),
  AdultASRSPartBQ3: z.string().nullable(),
  AdultASRSPartBQ4: z.string().nullable(),
  AdultASRSPartBQ5: z.string().nullable(),
  AdultASRSPartBQ6: z.string().nullable(),
  AdultASRSPartBQ7: z.string().nullable(),
  AdultASRSPartBQ8: z.string().nullable(),
  AdultASRSPartBQ9: z.string().nullable(),
  AdultASRSPartBQ10: z.string().nullable(),
  AdultASRSPartBQ11: z.string().nullable(),
  AdultASRSPartBQ12: z.string().nullable(),
})

export { adultASRSSchema, type AdultASRSSchemaType }
