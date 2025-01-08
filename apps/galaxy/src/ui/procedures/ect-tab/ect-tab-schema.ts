import { z } from 'zod'

type EctWidgetSchemaType = z.infer<typeof ectWidgetSchema>

const ectWidgetSchema = z.object({
  seriesMaintenance: z.enum(['series', 'maintenance']).optional(),
  series: z.string(),
  maintenance: z.string(),
  biteblock: z.enum(['Yes', 'No']),
  timeOut: z.string().trim().min(1, 'Required'),
  timeOfProcedure: z.string().trim().min(1, 'Required'),
  ectTypeBlock: z.string().min(1, 'Required'),
  ectSettingBlockPw: z.string().min(1, 'Required'),
  ectSettingBlockFrequency: z.string().min(1, 'Required'),
  ectSettingBlockDuration: z.string().min(1, 'Required'),
  ectSettingBlockCurrent: z.string().min(1, 'Required'),
  ectSeizureDuration: z.string().min(1, 'Required'),
  ectPostOpMedicationBlock: z.string().min(1, 'Required'),
  ectPostOpMedicationBlockDetails: z.string(),
  ectComplicationsBlock: z.string().min(1, 'Required'),
  ectComplicationsBlockDetails: z.string().optional(),
  ectAssessment: z.string().min(1, 'Required'),
  ectContinuePBlock: z.string().min(1, 'Required'),
  anesthesiologist: z.string(),
})

export { ectWidgetSchema, type EctWidgetSchemaType }
