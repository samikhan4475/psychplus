import { z } from 'zod'

type SubstanceUseSchemaType = z.infer<typeof substanceUseSchema>

const substanceUseSchema = z
  .object({
    tobacco: z.string().optional(),
    tobaccoChewSmoke: z.string().optional(),
    widgetContainerCheckboxField: z.string().optional(),
    smokePacks: z.string().optional(),
    alcohol: z.string().optional(),
    drugs: z.string().optional(),
    opioids: z.boolean(),
    opioidsDetails: z.string(),
    cocaine: z.boolean(),
    cocaineDetails: z.string(),
    pcp: z.boolean(),
    pcpDetails: z.string(),
    inhalants: z.boolean(),
    inhalantsDetails: z.string(),
    sedative: z.boolean(),
    sedativeDetails: z.string(),
    amphetamine: z.boolean(),
    amphetamineDetails: z.string(),
  })
  .superRefine((data, ctx) => {
    const isDrugYes = data.drugs === 'yes'
    const isTobaccoYes = data.tobacco === 'yes';
    const isSmokeSelected = data.tobaccoChewSmoke === 'smoke';
    const conditions = [
      data.opioids,
      data.cocaine,
      data.sedative,
      data.amphetamine,
      data.pcp,
      data.inhalants,
    ]
    if (isDrugYes) {
      if (
        conditions.every(
          (condition) => condition === false || condition === undefined,
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['drugs'],
          message: 'Select at least one drug.',
        })
      }
    }
    if (isTobaccoYes) {
      if (!data.tobaccoChewSmoke) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['tobaccoChewSmoke'],
          message: 'Required',
        });
      }
    }
    if (isSmokeSelected) {
      if (!data.smokePacks) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['smokePacks'],
          message: 'Required',
        });
      }
    }
  })


export { substanceUseSchema, type SubstanceUseSchemaType }
