import z from 'zod'
import {
  SocialHxLiving,
  SocialHxProfessionalEducation,
  SocialHxRelationStatus,
  SocialHxTraumaHx,
} from './types'

const socialSchema = z.object({
  relationshipStatus: z
    .enum([
      SocialHxRelationStatus.Single,
      SocialHxRelationStatus.DivorcedSeparated,
      SocialHxRelationStatus.Dating,
      SocialHxRelationStatus.Married,
    ])
    .optional(),
  professionalEducation: z
    .enum([
      SocialHxProfessionalEducation.InSchool,
      SocialHxProfessionalEducation.HsGed,
      SocialHxProfessionalEducation.College,
      SocialHxProfessionalEducation.None,
    ])
    .optional(),
  employed: z.enum(['yes', 'no']).optional(),
  legalHistory: z.enum(['yes', 'no']).optional(),
  living: z
    .enum([
      SocialHxLiving.Alone,
      SocialHxLiving.WithFamily,
      SocialHxLiving.Homeless,
    ])
    .optional(),
  traumaHx: z
    .enum([
      SocialHxTraumaHx.Physical,
      SocialHxTraumaHx.Sexual,
      SocialHxTraumaHx.Emotional,
    ])
    .optional(),
  other: z.string().optional(),
})

type SocialSchemaType = z.infer<typeof socialSchema>

export { socialSchema, type SocialSchemaType }
