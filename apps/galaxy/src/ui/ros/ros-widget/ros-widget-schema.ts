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
      ctOtherDetails: z.string().trim().optional(),
      entOtherDetails: z.string().trim().optional(),
      eyesOtherDetails: z.string().trim().optional(),
      cvsOtherDetails: z.string().trim().optional(),
      resOtherDetails: z.string().trim().optional(),
      giOtherDetails: z.string().trim().optional(),
      guOtherDetails: z.string().trim().optional(),
      msuOtherDetails: z.string().trim().optional(),
      sknOtherDetails: z.string().trim().optional(),
      neuOtherDetails: z.string().trim().optional(),
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
