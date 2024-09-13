import z from 'zod'

const descriptiveSchema = z.object({
  preferredName: z.string().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  professionalSuffix: z.string().optional(),
  gender: z.string().trim().min(1, 'Required'),
  genderOrientation: z.string().optional(),
  genderExpression: z.string().optional(),
  genderPronoun: z.string().optional(),
  comment: z.string().optional(),
  religion: z.string().optional(),
  motherMaidenName: z.string().optional(),
  language: z.string().optional(),
  languageAbility: z.string().optional(),
  languageProficiency: z.string().optional(),
  race: z.string().optional(),
  ethnicity: z.string().optional(),
})

type DescriptiveSchema = z.infer<typeof descriptiveSchema>

export { descriptiveSchema, type DescriptiveSchema }
