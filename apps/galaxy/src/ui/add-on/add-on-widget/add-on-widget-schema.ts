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

const addOnWidgetSchema = z.object({
  injection: z.boolean().optional(),
  drugName: z.string().optional(),
  dose: z.string().optional(),
  siteLocations: z.string().optional(),
  manufacturer: z.string().optional(),
  lotNumber: z.string().optional(),
  expirationDate: dateValidation.optional(),
  therapyPsychoanalysis: z
    .enum(['therapy', 'psychoanalysis', 'neither'])
    .optional(),
  therapyTimeSpent: z.string().optional(),
  '16-37 mins': z.string().optional(),
  '38-52 mins': z.string().optional(),
  '53-99 mins': z.string().optional(),
  therapySessionParticipants: z
    .enum([
      'Patients',
      'Patient with Patient/Guardian',
      'Patient & Partner',
      'Patient & Family',
      'Patient & Other',
    ])
    .optional(),
  patientOther: z.string().optional(),
  therapyDetailsModality: ModalityTransferenceData,
  therapyDetailsInterventions: ModalityTransferenceData,
  transferenceDescription: ModalityTransferenceData,
  psychoanalyticTechnique: ModalityTransferenceData,
  additionalTherapyDetail: z.string().optional(),
  additionalPsychoAnalysisDetail: z.string().optional(),
  interactiveComplexity: z.boolean().optional(),
  maladaptiveCommunication: z.boolean().optional(),
  caregiverEmotions: z.boolean().optional(),
  sentinelEvent: z.boolean().optional(),
  languageBarrier: z.boolean().optional(),
})

export { addOnWidgetSchema, type AddOnWidgetSchemaType }
