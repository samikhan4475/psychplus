import { z } from 'zod'

type SocialHxWidgetSchemaType = z.infer<typeof socialHxWidgetSchema>

const socialHxWidgetSchema = z.object({
  relationshipStatus: z.enum([
    'single',
    'divorcedSeparated',
    'dating',
    'married',
  ]),
  professionalEducation: z.enum(['inSchool', 'hsGed', 'college', 'none']),
  employed: z.enum(['yes', 'no']),
  legalHistory: z.enum(['yes', 'no']),
  living: z.enum(['alone', 'withFamily', 'homeless']),
  traumaHx: z.enum(['physical', 'sexual', 'emotional']),
})

export { socialHxWidgetSchema, type SocialHxWidgetSchemaType }
