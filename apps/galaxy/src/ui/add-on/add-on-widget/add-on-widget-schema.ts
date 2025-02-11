import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { ectWidgetSchema } from '@/ui/procedures/ect-tab/ect-tab-schema'
import { TherapySchema } from '@/ui/therapy/therapy-widget/individual/therapy-schema'

type AddOnWidgetSchemaType = z.infer<typeof addOnWidgetSchema>

const validateSchema = async <T>(
  schema: z.ZodSchema<T>,
  data: any,
  ctx: z.RefinementCtx,
) => {
  const validation = schema.safeParse(data)
  if (!validation.success) {
    validation.error.errors.forEach((error) => {
      ctx.addIssue(error)
    })
  }
}

// Schema definitions
const codesetOptions = z
  .array(
    z
      .object({
        value: z.string().optional(),
        display: z.string().optional(),
      })
      .optional(),
  )
  .optional()

const codesetOptionsPsychoanalysis = z.array(
  z.object({
    value: z.string(),
    display: z.string(),
  }),
)

const dateValidation = z.custom<DateValue | null>()

// Injection schema validation
const injectionSchema = z.object({
  drugName: z.string().min(1, 'Injection drug name must be entered.'),
  dose: z.string().min(1, 'Injection dose must be specified.'),
  siteLocations: z.string().min(1, 'Injection site location must be recorded.'),
  manufacturer: z.string().min(1, 'Injection manufacturer must be recorded.'),
  expirationDate: dateValidation,
})

// Psychoanalysis schema validation
const psychoanalysisSchema = z.object({
  transferenceDescription: codesetOptionsPsychoanalysis.min(1, {
    message: 'Description of Transference is required',
  }),
  psychoanalyticTechnique: codesetOptionsPsychoanalysis.min(1, {
    message: 'Psychoanalytic Technique is required',
  }),
  additionalPsychoAnalysisDetail: z
    .string()
    .min(1, 'Additional details for Psychoanalysis must be provided.')
    .max(4000, 'Max 4000 characters are allowed'),
})

// Base schema validation for all add-on widgets
const baseSchema = z.object({
  injection: z.boolean().optional(),
  therapy: z.boolean().optional(),
  ect: z.boolean().optional(),
  interactiveComplexity: z.boolean().optional(),
  therapyPsychoanalysis: z.string().optional(),

  // Injection schema
  drugName: z.string().optional(),
  dose: z.string().optional(),
  siteLocations: z.string().optional(),
  manufacturer: z.string().optional(),
  lotNumber: z.string().optional(),
  expirationDate: dateValidation.optional(),

  // Intreactive complexity schema
  maladaptiveCommunication: z.boolean().optional(),
  caregiverEmotions: z.boolean().optional(),
  sentinelEvent: z.boolean().optional(),
  languageBarrier: z.boolean().optional(),

  // Therapy schema
  therapyTimeSpent: z.string().optional(),
  timeRangeOne: z.string().optional(),
  timeRangeTwo: z.string().optional(),
  timeRangeThree: z.string().optional(),
  patientOther: z.string().optional(),
  therapyDetailsModality: codesetOptions.optional(),
  therapyDetailsInterventions: codesetOptions.optional(),
  therapySessionParticipants: z.string().optional(),
  additionalTherapyDetail: z.string().optional(),

  // psychoanalysis schema
  additionalPsychoAnalysisDetail: z.string().optional(),
  transferenceDescription: codesetOptions.optional(),
  psychoanalyticTechnique: codesetOptions.optional(),

  // ECT schema
  seriesMaintenance: z.string().optional(),
  series: z.string().optional(),
  maintenance: z.string().optional(),
  biteblock: z.string().optional(),
  timeOut: z.string().optional(),
  timeOfProcedure: z.string().optional(),
  ectTypeBlock: z.string().optional(),
  ectSettingBlockPw: z.string().optional(),
  ectSettingBlockFrequency: z.string().optional(),
  ectSettingBlockDuration: z.string().optional(),
  ectSettingBlockCurrent: z.string().optional(),
  ectSeizureDuration: z.string().optional(),
  ectPostOpMedicationBlock: z.string().optional(),
  ectPostOpMedicationBlockDetails: z.string().optional(),
  ectComplicationsBlock: z.string().optional(),
  ectComplicationsBlockDetails: z.string().optional(),
  ectAssessment: z.string().optional(),
  ectContinuePBlock: z.string().optional(),
  anesthesiologist: z.string().optional(),
})

const addOnWidgetSchema = baseSchema.superRefine(async (data, ctx) => {
  if (data.interactiveComplexity) {
    // Interactive Complexity Validation
    const hasAtLeastOne =
      data.maladaptiveCommunication ||
      data.caregiverEmotions ||
      data.sentinelEvent ||
      data.languageBarrier

    if (!hasAtLeastOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'At least one checkbox must be selected under Interactive Complexity.',
        path: ['interactiveComplexity'],
      })
    }
  }
  if (data.injection) {
    // INJECTION schema validation
    await validateSchema(injectionSchema, data, ctx)
  }

  if (data.therapy) {
    // PSYCHOANALYSIS schema validation
    if (data.therapyPsychoanalysis === 'psychoanalysis') {
      await validateSchema(psychoanalysisSchema, data, ctx)
    } else if (data.therapyPsychoanalysis === 'neither') {
      return
    } else {
      // THERAPY schema validation
      await validateSchema(TherapySchema, data, ctx)
    }
  }

  // ECT schema validation
  if (data.ect) {
    await validateSchema(ectWidgetSchema, data, ctx)
  }
})

export { addOnWidgetSchema, type AddOnWidgetSchemaType }
