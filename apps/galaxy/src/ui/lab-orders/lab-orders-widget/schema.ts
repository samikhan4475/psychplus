import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  labResults: z.object({
    id: z.string().optional(),
    orderId: z.string().optional(),
    observationTime: z
      .custom<DateValue>()
      .refine((val) => val !== null && val !== undefined, 'Required'),
    resultCode: z.string().optional(),
    resultValue: z.string().min(1, 'Required'),
    resultName: z.string().min(1, 'Required'),
    resultValueUnit: z.string().min(1, 'Required'),
    recomendedValue: z.string().optional(),
    abnormalRangeCode: z.string().optional(),
    physicianComments: z.string().optional(),
    labComments: z.string().optional(),
    statusCode: z.string().optional(),
    labTestId: z.string().optional(),
  }),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
