import z from 'zod'

const alternativeInfoSchema = z.object({
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  professionalSuffix: z.string().optional(),
  firstName: z.string().trim().min(1, 'Required'),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1, 'Required'),
})

type AlternativeInfoSchema = z.infer<typeof alternativeInfoSchema>

export { alternativeInfoSchema, type AlternativeInfoSchema }
