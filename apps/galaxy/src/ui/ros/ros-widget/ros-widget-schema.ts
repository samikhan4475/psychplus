import { z } from 'zod'
import { ERROR_ID, ROS_ERROR_MESSAGE } from './constant'

const VisitTypeMapper: Record<string, boolean> = {
  IndividualPsychotherapy: true,
  FamilyPsychotherapy: true,
  Tms: true,
  Ect: true,
  Spravato: true,
}

const createRosWidgetSchema = (visitType: string) =>
  z
    .object({
      constitutional: z.array(z.string()),
      entMouth: z.array(z.string()),
      eyes: z.array(z.string()),
      cardiovascular: z.array(z.string()),
      respiratory: z.array(z.string()),
      gastrointestinal: z.array(z.string()),
      genitourinary: z.array(z.string()),
      skin: z.array(z.string()),
      musculoskeletal: z.array(z.string()),
      neuro: z.array(z.string()),
      ctOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      entOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      eyesOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      cvsOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      resOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      giOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      guOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      msuOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      sknOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      neuOtherDetails: z
        .string()
        .max(500, 'Max 500 characters are allowed')
        .optional(),
      reviewSystemError: z.string().optional(),
    })
    .refine(
      (data) => {
        if (VisitTypeMapper[visitType]) return true

        const selectedSections = [
          data.constitutional,
          data.entMouth,
          data.eyes,
          data.cardiovascular,
          data.respiratory,
          data.gastrointestinal,
          data.genitourinary,
          data.skin,
          data.musculoskeletal,
          data.neuro,
        ].filter((section) => section.length > 0).length

        return selectedSections >= 3
      },
      {
        message: ROS_ERROR_MESSAGE,
        path: [ERROR_ID],
      },
    )

type RosWidgetSchemaType = z.infer<ReturnType<typeof createRosWidgetSchema>>

export { createRosWidgetSchema, VisitTypeMapper, type RosWidgetSchemaType }
