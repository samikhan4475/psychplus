import { z } from 'zod'

const schema = z.object({
  publicViewHideMinsBeforeVisit: z.string().optional(),
  staffBookingCutoffMinsBeforeVisit: z.string().optional(),
  dayIsFullDoNotShowPublicViewPercent: z.array(z.string()).optional(),
  dayIsFullDoNotAllowStaffToBookPercent: z.array(z.string()).optional(),

  patientIsInRoom: z.string().optional(),
  minutesLeftFromPatientSchedule: z.string().optional(),
  showNeitherOnTherapyTimeDependentVisits: z.string().optional(),
  allowDoubleBookingUnconfirmedTimeDependentVisits: z.string().optional(),

  cosignerInfoDirectSupervisionText: z.string().optional(),
  cosignerInfoIndirectSupervisionText: z.string().optional(),
  isCosignerInfoDirectSupervision: z.string().optional(),
  isCosignerInfoIndirectSupervision: z.string().optional(),

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

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
