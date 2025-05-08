import z from 'zod'

const schema = z.object({
  fromOrganizationId: z
    .string()
    .min(1, { message: 'From Organization is required' }),
  fromRoleId: z.string().min(1, { message: 'From role is required' }),
  toOrganizationId: z
    .string()
    .min(1, { message: 'To organization is required' }),
  toRoleId: z.string().min(1, { message: 'To role is required' }),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
