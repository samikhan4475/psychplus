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
    visitMediums: z.string().optional(),
    providerTypes: z.string().optional(),
    gender: z.string().optional(),
    providerLanguage: z.string().optional(),
    servicesOffered: arrayOfIdsValidation.optional(),
    unitIds:arrayOfIdsValidation.optional(),
    roomIds:arrayOfIdsValidation.optional(),
    groupIds:arrayOfIdsValidation.optional(),
    visitTypes:arrayOfIdsValidation.optional()
  })

export { calenderViewSchema }
