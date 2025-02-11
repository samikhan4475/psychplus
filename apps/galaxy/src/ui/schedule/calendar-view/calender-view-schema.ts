import { z } from 'zod'

const arrayOfIdsValidation = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const calenderViewSchema = z
  .object({
    stateIds: arrayOfIdsValidation,
    locationIds: arrayOfIdsValidation,
    serviceIds: arrayOfIdsValidation,
    providerIds: z.string().optional(),
    visitMedium: z.string().optional(),
    providerType: z.string().optional(),
    gender: z.string().optional(),
    providerLanguage: z.string().optional(),
  })

export { calenderViewSchema }
