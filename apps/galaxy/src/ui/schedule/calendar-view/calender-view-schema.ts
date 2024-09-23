import { z } from 'zod'

const calenderViewSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  stateId: z.string().optional(),
  location: z.string().optional(),
  serviceId: z.string().optional(),
  provider: z.string().optional(),
  visitMedium: z.string().optional(),
  providerType: z.string().optional(),
  gender: z.string().optional(),
  timeOfTheDay: z.string().optional(),
  language: z.string().optional(),
  isFirstResponder: z.boolean().optional(),
})

export { calenderViewSchema }
