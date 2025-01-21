import z from 'zod'

const schema = z
  .object({
    locationId: z.string(),
    serviceOffered: z.string(),
    locationName: z.string(),
    servicePlace: z.string().optional(),
    taxonomy: z.string().optional(),
    primaryProviderType: z.string().optional(),
    isPrimaryProviderRequired: z.string().optional(),
    maxBookingFrequencyInSlot: z.string().min(0, 'Required'),
    isClaimAddress: z.boolean(),
    isPolicyRequired: z.string(),
    isReminderForNotes: z.string(),
    isReminderForVisit: z.string(),
    isPatientSeenEveryDay: z.string(),
    isAutomaticBilling: z.string(),
    billingUsageType: z.string(),
    isServiceTimeDependent: z.string(),
    isRequiresMedicalVisit: z.boolean(),
    coSignerType: z.string().min(1, 'Required'),
    address1: z.ostring().optional(),
    address2: z.string().optional(),
    city: z.ostring().optional(),
    state: z.ostring().optional(),
    zip: z.string().max(5, 'Invalid ZIP').optional(),
    serviceVisitTypes: z.array(z.number()).min(1, 'Required'),
    cosigner: z.string().optional(),
    cityId: z.string().optional(),
    stateId: z.string().optional(),
    coSignerId: z.string().optional(),
    locationType: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.isClaimAddress === false) {
      if (!data.address1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['address1'],
        })
      }
      if (!data.state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['state'],
        })
      }
      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['city'],
        })
      }
      if (!data.zip) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['zip'],
        })
      }
    }
  })

type ServiceSchemaType = z.infer<typeof schema>
export { schema, type ServiceSchemaType }
