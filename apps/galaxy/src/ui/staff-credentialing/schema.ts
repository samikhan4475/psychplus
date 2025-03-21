import { DateValue } from 'react-aria-components'
import z from 'zod'
import { LicenseStatus, LicenseType } from './types'

const schema = z
  .object({
    stateCode: z.string(),
    stateName: z.string(),
    status: z.nativeEnum(LicenseStatus).optional(),
    licenseType: z.nativeEnum(LicenseType),
    licenseNumber: z.string().optional(),
    isAlertCheck: z.boolean().default(true),
    startDate: z.custom<DateValue>().optional(),
    endDate: z.custom<DateValue>().optional(),
  })
  .superRefine((data, ctx) => {
    const requiredFields = [
      { field: 'licenseType', message: 'Required' },
      { field: 'licenseNumber', message: 'Required' },
      { field: 'startDate', message: 'Required' },
      { field: 'endDate', message: 'Required' },
    ]

    requiredFields.forEach(({ field, message }) => {
      if (!data[field as keyof SchemaType]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message,
        })
      }
    })
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be greater than start date',
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
