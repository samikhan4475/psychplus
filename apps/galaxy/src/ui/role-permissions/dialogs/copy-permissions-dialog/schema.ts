import z from 'zod'

const schema = z.object({
  fromOrganizationId: z
    .string()
    .min(1, { message: 'From Organization is required' }),
  fromPracticeId: z.string().min(1, { message: 'From practice is required' }),
  fromUserId: z.string().min(1, { message: 'From staff member is required' }),
  fromRoleId: z.string().min(1, { message: 'From role is required' }),
  toOrganizationId: z
    .string()
    .min(1, { message: 'To organization is required' }),
  toPracticeId: z.string().optional(),
  toUserId: z.string().optional(),
  toRoleId: z.string().min(1, { message: 'To role is required' }),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
