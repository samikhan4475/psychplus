import z from 'zod'

const schema = z.object({
  id: z.string(),
  clearingHouseName: z
    .string()
    .min(1, { message: 'Clearing house name is required' }),
  receiverId: z.string().min(1, { message: 'Receiver id is required' }),
  receiverName: z.string().min(1, { message: 'Receiver name is required' }),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  submissionMethod: z
    .string()
    .min(1, { message: 'Submission method is required' }),
  submissionUrl: z.string().min(1, { message: 'Submission url is required' }),
  submissionPort: z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: 'Submission port must be a valid number',
    })
    .refine((val) => parseFloat(val) > 0, {
      message: 'Submission port must be greater than 0',
    }),

  submissionDirectory: z
    .string()
    .min(1, { message: 'Submission directory is required' }),
  batchResponseDirectory: z
    .string()
    .min(1, { message: 'Batch response directory is required' }),
  chResponseDirectory: z
    .string()
    .min(1, { message: 'CH response directory is required' }),
  claimResponseDirectory: z
    .string()
    .min(1, { message: 'Claim response directory is required' }),
  eraResponseDirectory: z
    .string()
    .min(1, { message: 'ERA response directory is required' }),
  isa01: z.string().optional(),
  isa03: z.string().optional(),
  isa05: z.string().optional(),
  isa07: z.string().optional(),
  isa08: z.string().optional(),
  gs03: z.string().optional(),
  nm140ReceiverName: z.string().optional(),
  nm140ReceiverId: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  isSupportMultipleDirectory: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
