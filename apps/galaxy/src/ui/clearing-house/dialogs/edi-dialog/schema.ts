import z from 'zod'

const schema = z.object({
  id: z.string(),
  receiverId: z.string().min(1, { message: 'Receiver name is required' }),
  insurancePlanId: z
    .string()
    .min(1, { message: 'Insurance plan name is required' }),
  payerId: z.string().min(1, { message: 'Payer id is required' }),
  isEligibility: z.boolean().default(false),
  isElectronic: z.boolean().default(false),
  isInstitutional: z.boolean().default(false),
  isDental: z.boolean().default(false),
  isPaperCms1500: z.boolean().default(false),
  isPaperUb04: z.boolean().default(false),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
