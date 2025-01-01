import { TherapySchema } from '@/ui/therapy/therapy-widget/individual/therapy-schema'
import { DateValue } from 'react-aria-components'
import { z } from 'zod'

type AddOnWidgetSchemaType = z.infer<typeof addOnWidgetSchema>
const ModalityTransferenceData = z.array(
  z
    .object({
      value: z.string(),
      display: z.string(),
    })
    .optional(),
)
const dateValidation = z.custom<DateValue | null>()

const addOnWidgetSchema = z
  .object({
    injection: z.boolean().optional(),
    drugName: z.string().optional(),
    dose: z.string().optional(),
    siteLocations: z.string().optional(),
    manufacturer: z.string().optional(),
    lotNumber: z.string().optional(),
    expirationDate: dateValidation.optional(),
    therapy: z.boolean().optional(),
    therapyPsychoanalysis: z
      .enum(['therapy', 'psychoanalysis', 'neither'])
      .optional(),
    transferenceDescription: ModalityTransferenceData,
    psychoanalyticTechnique: ModalityTransferenceData,
    additionalPsychoAnalysisDetail: z.string().optional(),
    interactiveComplexity: z.boolean().optional(),
    maladaptiveCommunication: z.boolean().optional(),
    caregiverEmotions: z.boolean().optional(),
    sentinelEvent: z.boolean().optional(),
    languageBarrier: z.boolean().optional(),
    ect: z.boolean().optional(),
    seriesMaintenance: z.enum(['series', 'maintenance']).optional(),
    series: z.string(),
    maintenance: z.string(),
    biteblock: z.enum(['yes', 'no']),
    timeOut: z.string().trim(),
    timeOfProcedure: z.string().trim(),
    ectTypeBlock: z.string(),
    ectSettingBlockPw: z.string(),
    ectSettingBlockFrequency: z.string(),
    ectSettingBlockDuration: z.string(),
    ectSettingBlockCurrent: z.string(),
    ectSeizureDuration: z.string(),
    ectPostOpMedicationBlock: z.string(),
    ectPostOpMedicationBlockDetails: z.string(),
    ectComplicationsBlock: z.string(),
    ectComplicationsBlockDetails: z.string().optional(),
    ectAssessment: z.string(),
    ectContinuePBlock: z.string(),
    providerType: z.string(),
  })
  .merge(TherapySchema)

export { addOnWidgetSchema, type AddOnWidgetSchemaType }
