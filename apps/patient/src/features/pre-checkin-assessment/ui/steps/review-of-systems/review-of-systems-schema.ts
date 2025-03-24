import { z } from 'zod'

const VisitTypeMapper: Record<string, boolean> = {
  IndividualPsychotherapy: true,
  FamilyPsychotherapy: true,
  Tms: true,
  Ect: true,
  Spravato: true,
}

const createRosWidgetSchema = () =>
  z.object({
    entMouth: z.array(z.string()),
    constitutional: z.array(z.string()),
    eyes: z.array(z.string()),
    respiratory: z.array(z.string()),
    cardiovascular: z.array(z.string()),
    genitourinary: z.array(z.string()),
    gastrointestinal: z.array(z.string()),
    skin: z.array(z.string()),
    neuro: z.array(z.string()),
    musculoskeletal: z.array(z.string()),
    ctOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    eyesOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    entOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    resOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    cvsOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    guOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    giOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    msuOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    neuOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    sknOtherDetails: z
      .string()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    reviewSystemError: z.string().optional(),
  })

type RosWidgetSchemaType = z.infer<ReturnType<typeof createRosWidgetSchema>>

export { createRosWidgetSchema, VisitTypeMapper, type RosWidgetSchemaType }
