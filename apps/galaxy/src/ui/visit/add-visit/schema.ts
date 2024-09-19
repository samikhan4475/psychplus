import { DateValue } from 'react-aria-components'
import z, { RefinementCtx } from 'zod'

const schema = z
  .object({
    patient: z.object({
      id: z.number(),
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      birthdate: z.string(),
      gender: z.string(),
      medicalRecordNumber: z.string(),
      status: z.string(),
      state: z.string(),
    }),
    state: z.string().min(1, 'Required'),
    location: z.string().min(1, 'Required'),
    service: z.string().min(1, 'Required'),
    isServiceTimeDependent: z.boolean().default(true),
    visitType: z.string().min(1, 'Required'),

    // Timed Service
    providerType: z.string().min(1, 'Required'),
    provider: z.string().min(1, 'Required'),
    groupType: z.string().min(1, 'Required'),
    dcDate: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    dcHospitalName: z.string().min(1, 'Required'),
    edDischarge: z.string().min(1, 'Required'),
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
    visitSequence: z.string().min(1, 'Required'),
    visitStatus: z.string().min(1, 'Required'),
    visitMedium: z.string().min(1, 'Required'),
    facilityAdmissionId: z.string().min(1, 'Required'),
    dateOfAdmission: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, {
        message: 'Required',
      }),
    timeOfAdmission: z.string().min(1, 'Required'),
    admittingProvider: z.string().min(1, 'Required'),
    visitFrequency: z.string().min(1, 'Required'),
    authNumber: z.string().min(1, 'Required'),
    authDate: z.string().min(1, 'Required'),
    legal: z.string().min(1, 'Required'),
    unit: z.string().min(1, 'Required'),
    room: z.string().min(1, 'Required'),
    group: z.string().min(1, 'Required'),
  })
  .superRefine((data, ctx) => {
    debugger
    const validateTimedService = (
      _data: Partial<SchemaType>,
      _ctx: RefinementCtx,
    ) => {
      const requiredFields = [
        { field: 'providerType', message: 'Required' },
        { field: 'provider', message: 'Required' },
        { field: 'visitType', message: 'Required' },
        { field: 'groupType', message: 'Required' },
        { field: 'dcDate', message: 'Required' },
        { field: 'dcHospitalName', message: 'Required' },
        { field: 'edDischarge', message: 'Required' },
        { field: 'visitDate', message: 'Required' },
        { field: 'visitTime', message: 'Required' },
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

    const validateUntimedService = (
      _data: Partial<SchemaType>,
      _ctx: RefinementCtx,
    ) => {
      const requiredFields = [
        { field: 'visitSequence', message: 'Required' },
        { field: 'visitStatus', message: 'Required' },
        { field: 'visitMedium', message: 'Required' },
        { field: 'facilityAdmissionId', message: 'Required' },
        { field: 'dateOfAdmission', message: 'Required' },
        { field: 'timeOfAdmission', message: 'Required' },
        { field: 'admittingProvider', message: 'Required' },
        { field: 'visitFrequency', message: 'Required' },
        { field: 'authNumber', message: 'Required' },
        { field: 'authDate', message: 'Required' },
        { field: 'legal', message: 'Required' },
        { field: 'unit', message: 'Required' },
        { field: 'room', message: 'Required' },
        { field: 'group', message: 'Required' },
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

    if (data.service === 'timed') {
      validateTimedService(data, ctx)
    } else if (data.service === 'untimed') {
      validateUntimedService(data, ctx)
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
