import { z } from 'zod'

type TmsWidgetSchemaType = z.infer<typeof tmsWidgetSchema>

const tmsWidgetSchema = z.object({
  tmsSeizureBlock: z.object({
    seizure: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  tmsDizzinessBlock: z.object({
    dizziness: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  tmsHeadacheBlock: z.object({
    headache: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  tmsFatigueBlock: z.object({
    fatigue: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  tmsMuscleTwitchingBlock: z.object({
    muscleTwitching: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  suicide: z.enum(['yes', 'no']), // Kept as is
  tmsScalpDiscomfortBlock: z.object({
    scalpDiscomfort: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  tmsOtherBlock: z.object({
    other: z.enum(['yes', 'no']),
    details: z.string().optional().nullable(),
  }),
  dischargePlan: z.array(z.enum([
    'continueWithCurrentProtocol',
    'modifyTreatmentPlan',
    'discontinueTreatment',
    'referral',
    'followupAssessmentScreening'
  ])
  ),
  tmsDischargePlanBlock: z.array(z.object({
    discharge: z.enum([
      'continueWithCurrentProtocol',
      'modifyTreatmentPlan',
      'discontinueTreatment',
      'referral',
      'followupAssessmentScreening'
    ]),
    value: z.string(),
  })),
  followUpBlock: z.array(z.string().optional())
})

export { tmsWidgetSchema, type TmsWidgetSchemaType }
