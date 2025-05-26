import z from 'zod'
import { zipLast4Schema } from '@/utils'

const schema = z.object({
  id: z.ostring(),
  locationId: z.string(),
  serviceOffered: z.string().min(1, 'Required'),
  locationName: z.string(),
  servicePlace: z.string().optional(),
  taxonomy: z.string().optional(),
  primaryProviderType: z.string().optional(),
  isPrimaryProviderRequired: z.string().optional(),
  maxBookingFrequencyInSlot: z
    .string()
    .min(1, 'Required')
    .refine((val) => Number(val) > 0, { message: 'Must be greater than 0' }),
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
  address1: z.string().min(1, 'Required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  zip: z.string().max(5, 'Invalid ZIP').min(1, 'Required'),
  zipLast4: zipLast4Schema,
  serviceVisitTypes: z.array(z.string()).min(1, 'Required'),
  cosigner: z.string().optional(),
  cityId: z.string().optional(),
  stateId: z.string().optional(),
  coSignerId: z.string().optional(),
  locationType: z.string(),
})

type ServiceSchemaType = z.infer<typeof schema>
export { schema, type ServiceSchemaType }
