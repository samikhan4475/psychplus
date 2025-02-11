import { z } from 'zod'
import {
  SocialHxLiving,
  SocialHxProfessionalEducation,
  SocialHxRelationStatus,
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
  traumaHx: z.array(z.string()),
  other: z.string().max(4000, 'Max 4000 characters are allowed').optional(),
})

export { socialHxWidgetSchema, type SocialHxWidgetSchemaType }
