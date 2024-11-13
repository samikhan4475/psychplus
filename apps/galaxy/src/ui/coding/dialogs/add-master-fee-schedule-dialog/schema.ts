import z from 'zod'

const amountRegex = /^\d+(\.\d{1,2})?$/
const numberRegex = /^\d+$/

const amountSchema = (name: string) =>
  z
    .string()
    .min(1, `${name} is required`) // Check for presence first
    .refine((value) => amountRegex.test(value), {
      message: 'Must be a number with two decimal places.',
    })

const ageSchema = z
  .string()
  .refine((value) => numberRegex.test(value) || value === '', {
    message: 'Must be a number',
  })
  .optional()

const schema = z.object({
  id: z.string().optional(),
  gender: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  maximumAge: ageSchema,
  minimumAge: ageSchema,
  placeOfService: z.string().min(1, 'Place of service is required'),
  recordStatus: z.string().min(1, 'Status is required'),
  cptCode: z.string().min(1, 'CPT code is required'),
  description: z.string().min(1, 'Description is required'),
  requirement: z.string().min(1, 'Requirement is required'),
  mdDoAmount: amountSchema('MD/DO'),
  npAmount: amountSchema('NP'),
  paAmount: amountSchema('PA'),
  psyDAmount: amountSchema('PsyD'),
  mastersAmount: amountSchema('Masters'),
})
type SchemaType = z.infer<typeof schema>
export { schema, type SchemaType }
