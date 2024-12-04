import { z } from 'zod'
import {
  SocialHxLiving,
  SocialHxProfessionalEducation,
  SocialHxRelationStatus,
  SocialHxTraumaHx,
} from './types'

type SocialHxWidgetSchemaType = z.infer<typeof socialHxWidgetSchema>

const socialHxWidgetSchema = z.object({
  widgetContainerCheckboxField: z.string().optional(),
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

export { socialHxWidgetSchema, type SocialHxWidgetSchemaType }
