import { amp } from 'next.config'
import { z } from 'zod'

type SubstanceUseHxWidgetSchemaType = z.infer<typeof substanceUseHxWidgetSchema>

const substanceUseHxWidgetSchema = z.object({
  tobacco: z.enum(['yes', 'no']),
  tobaccoChewSmoke: z.enum(['chew', 'smoke']).optional(),
  tobaccoStartDate: z.string().optional(),
  tobaccoEndDate: z.string().optional(),
  tobaccoStatus: z.string().optional(),
  smokingCessationOption: z.string().optional(),
  counselingOption: z.string().optional(),
  smokingCessationDiscussionDuration: z.enum(['>=3m', '>=11m']).optional(),
  alcohol: z.enum(['yes', 'no']),
  drugs: z.enum(['yes', 'no']),
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
  questionnaire: z.ostring(),
})

export { substanceUseHxWidgetSchema, type SubstanceUseHxWidgetSchemaType }
