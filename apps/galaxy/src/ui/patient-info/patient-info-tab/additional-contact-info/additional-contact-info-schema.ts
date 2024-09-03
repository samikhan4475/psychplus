import z from 'zod'

const additionalContactInfoSchema = z.object({
  homePhoneNumber: z
    .string()
    .trim()
    .min(1, 'Required')
    .length(10, 'Invalid home phone'),
  homePhoneExt: z.string().trim().optional(),
  homePhoneComment: z.string().optional(),
  workPhoneNumber: z
    .string()
    .trim()
    .min(1, 'Required')
    .length(10, 'Invalid work phone'),
  workPhoneExtension: z.string().trim().optional(),
  workPhoneComment: z.string().optional(),
})

type AdditionalContactInfoSchema = z.infer<typeof additionalContactInfoSchema>

export { additionalContactInfoSchema, type AdditionalContactInfoSchema }
