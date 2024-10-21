import { z } from 'zod'

type EctWidgetSchemaType = z.infer<typeof ectWidgetSchema>

const ectWidgetSchema = z.object({
  seriesMaintenance: z.enum(['series', 'maintenance']).optional(), 
  biteblock: z.enum(['yes', 'no']),
  timeout: z.string(),
  timeOfProcedure: z.string(), 
  ectTypeBlock: z.enum(['bilatera', 'standardRul', 'ultraBriefRUL']),
  ectSettingBlock: z.object({
    pw: z.string(), 
    frequency: z.string(),
    duration: z.string(), 
    current: z.string(),
  }),
  ectSeizureDuration: z.string(),
  ectPostOpMedicationBlock: z.object({
    postMedication: z.enum(['yes', 'no']),
    details: z.string().optional().nullable() 
  }),
  ectComplicationsBlock: z.object({
    complication: z.enum(['yes', 'no']),
    details: z.string().optional().nullable() 
  }),
  ectAssessment: z.string(),
  ectContinuePBlock: z.enum(['series', 'maintenance']),
});

export { ectWidgetSchema, type EctWidgetSchemaType }
