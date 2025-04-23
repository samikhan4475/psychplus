import z from 'zod'

const autoTextSchema = z.object({
  name: z
    .string()
    .min(1, 'Required')
    .max(128, 'Max 128 characters are allowed'),
  content: z
    .string()
    .min(1, 'Required')
    .max(4000, 'Max 4000 characters are allowed'),
})

type AutoTextSchemaType = z.infer<typeof autoTextSchema>

export { autoTextSchema, type AutoTextSchemaType }
