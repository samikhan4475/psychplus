import z from 'zod'

const socialHxSchema = z.object({
  relationshipStatus: z.string().optional(),
  professionalEducation: z.string().optional(),
  employed: z.string().optional(),
  legalHistory: z.string().optional(),
  living: z.string().optional(),
  traumaHx: z.array(z.string()),
})

type SocialHxSchemaType = z.infer<typeof socialHxSchema>

export { socialHxSchema, type SocialHxSchemaType }
