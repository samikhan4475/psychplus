import { z } from 'zod'

const publicSchema = z.object({
  publicViewHideMinsBeforeVisit: z.string().optional(),
  staffBookingCutoffMinsBeforeVisit: z.string().optional(),
  dayIsFullDoNotShowPublicViewPercent: z.array(z.string()).optional(),
  dayIsFullDoNotAllowStaffToBookPercent: z.array(z.string()).optional(),
})

const alertSchema = z.object({
  patientIsInRoom: z.string().optional(),
  minutesLeftFromPatientSchedule: z.string().optional(),
  showNeitherOnTherapyTimeDependentVisits: z.string().optional(),
  allowDoubleBookingUnconfirmedTimeDependentVisits: z.string().optional(),
})

const cosignerInfoSchema = z.object({
  cosignerInfoDirectSupervisionText: z.string().optional(),
  cosignerInfoInDirectSupervisionText: z.string().optional(),
  isCosignerInfoDirectSupervision: z.string().optional(),
  isCosignerInfoIndirectSupervision: z.string().optional(),
})

const visitTypesSchema = z.object({
  visitTypes: z.array(
    z.object({
      selectedCPTCode: z.string().optional(),
      visitTypeCode: z.string().optional(),
      visitSequence: z.string().optional(),
      visitMedium: z.string().optional(),
      visitNoteTitle: z.string().optional(),
      cptPrimaryCodes: z.array(
        z.object({
          code: z.string(),
          isDefault: z.boolean(),
          isDisabled: z.boolean(),
        }),
      ),
      defaultDuration: z.string().optional(),
      defaultCPTCode: z.string().optional(),
      visitDurationsInMinutes: z.array(z.number()).optional(),
    }),
  ),
})

const schema = z.object({
  ...publicSchema.shape,
  ...alertSchema.shape,
  ...cosignerInfoSchema.shape,
  ...visitTypesSchema.shape,
})

type SchemaType = z.infer<typeof schema>
type PublicSchemaType = z.infer<typeof publicSchema>
type AlertSchemaType = z.infer<typeof alertSchema>
type CosignerInfoSchemaType = z.infer<typeof cosignerInfoSchema>
type VisitTypesSchemaType = z.infer<typeof visitTypesSchema>

export {
  publicSchema,
  alertSchema,
  cosignerInfoSchema,
  visitTypesSchema,
  schema,
  type SchemaType,
  type PublicSchemaType,
  type AlertSchemaType,
  type CosignerInfoSchemaType,
  type VisitTypesSchemaType,
}
