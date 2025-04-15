import z from 'zod'

const autoTextSchema = z.object({
  name: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
})

type AutoTextSchemaType = z.infer<typeof autoTextSchema>

export { autoTextSchema, type AutoTextSchemaType }
