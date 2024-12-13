import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  labResults: z.array(
    z.object({
      id: z.string(),
      orderId: z.string(),
      observationTime: z.union([z.string(), z.custom<DateValue>()]).optional(),
      resultCode: z.string().optional(),
      resultValue: z.string().optional(),
      resultName: z.string().optional(),
      resultValueUnit: z.string().optional(),
      recomendedValue: z.string().optional(),
      abnormalRangeCode: z.string().optional(),
      physicianComments: z.string().optional(),
      labComments: z.string().optional(),
      recordStatus: z.string().optional(),
      labTestId: z.string(),
    }),
  ),
  editingLabResultId: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
