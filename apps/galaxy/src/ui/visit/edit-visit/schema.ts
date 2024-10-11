import { DateValue } from 'react-aria-components'
import z, { RefinementCtx } from 'zod'

const schema = z
  .object({
    patient: z.object({
      id: z.number(),
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      gender: z.string(),
      state: z.string(),
      medicalRecordNumber: z.string(),
      birthdate: z.string(),
      status: z.string(),
    }),
    state: z.string().min(1, 'Required'),
    location: z.string().min(1, 'Required'),
    isServiceTimeDependent: z.boolean().default(true),
    service: z.string().min(1, 'Required'),
    visitType: z.string().min(1, 'Required'),
    visitSequence: z.string().min(1, 'Required'),
    visitMedium: z.string().min(1, 'Required'),

    // Timed Service
    providerType: z.string().min(1, 'Required'),
    provider: z.string().min(1, 'Required'),
    visitDate: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    visitTime: z.string().min(1, 'Required'),
    duration: z.string().min(1, 'Required'),
    frequency: z.string().min(1, 'Required'),

    // Untimed Service
    nonTimeProviderType: z.string().min(1, 'Required'),
    facilityAdmissionId: z.string().min(1, 'Required'),
    dateOfAdmission: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    admittingProvider: z.string().min(1, 'Required'),
    timeOfAdmission: z.string().min(1, 'Required'),
    visitFrequency: z.string().min(1, 'Required'),
    visitStatus: z.string().min(1, 'Required'),
    insuranceVerificationStatus: z.string(),
    legal: z.string(),
    authNumber: z.string(),
    authDate: z.custom<DateValue>(),
    lastCoverageDate: z.custom<DateValue>(),
    unit: z.string(),
    room: z.string(),
    group: z.string(),
  })
  .superRefine((data, ctx) => {
    const validateTimedService = (
      _data: Partial<SchemaType>,
      _ctx: RefinementCtx,
    ) => {
      const requiredFields = [
        { field: 'providerType', message: 'Required' },
        { field: 'provider', message: 'Required' },
        { field: 'visitType', message: 'Required' },
        { field: 'visitMedium', message: 'Required' },
        { field: 'visitSequence', message: 'Required' },
        { field: 'groupType', message: 'Required' },
        { field: 'visitTime', message: 'Required' },
        { field: 'visitDate', message: 'Required' },
        { field: 'duration', message: 'Required' },
        { field: 'frequency', message: 'Required' },
      ]

      requiredFields.forEach(({ field, message }) => {
        if (!_data[field as keyof SchemaType]) {
          _ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          })
        }
      })
    }

    validateTimedService(data, ctx)
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
