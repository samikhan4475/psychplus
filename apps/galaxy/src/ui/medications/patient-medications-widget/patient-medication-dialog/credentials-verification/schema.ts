import z from 'zod'

const schema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
})

type CredentialsVerificationSchemaType = z.infer<typeof schema>
export { schema, type CredentialsVerificationSchemaType }
