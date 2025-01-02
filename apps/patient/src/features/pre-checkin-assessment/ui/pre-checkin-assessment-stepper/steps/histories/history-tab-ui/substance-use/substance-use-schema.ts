import z from 'zod'

const substanceSchema = z.object({
  tobacco: z.enum(['yes', 'no']).optional(),
  tobaccoChewSmoke: z.enum(['chew', 'smoke']).optional(),
  smokePacks: z.enum(['0.5', '1', '2']).optional(),
  smokingCessationOption: z.string().optional(),
  counselingOption: z.string().optional(),
  smokingCessationDiscussionDuration: z.enum(['>=3m', '>=11m']).optional(),
  otherTobacco: z.string().optional(),
  alcohol: z.enum(['yes', 'no']).optional(),
  drugs: z.enum(['yes', 'no']).optional(),
  opioids: z.oboolean(),
  opioidsDetails: z.ostring(),
  sedative: z.oboolean(),
  sedativeDetails: z.ostring(),
  cocaine: z.oboolean(),
  cocaineDetails: z.ostring(),
  amphetamine: z.oboolean(),
  amphetamineDetails: z.ostring(),
  pcp: z.oboolean(),
  pcpDetails: z.ostring(),
  inhalants: z.oboolean(),
  inhalantsDetails: z.ostring(),
  questionnaire: z.enum(['yes', 'no']).optional(),
  briefIntervention: z.oboolean(),
  referralTreatment: z.array(z.string()).optional(),
  alcoholSubstanceCessationDiscussionDuration: z
    .enum(['>=15m', '>=31m'])
    .optional(),
  otherAlcoholDrugs: z.string().optional(),
})

type SubstanceSchemaType = z.infer<typeof substanceSchema>

export { substanceSchema, type SubstanceSchemaType }
