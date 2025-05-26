import { z } from 'zod'

const zipCodeSchema = z
  .string()
  .trim()
  .min(1, 'Required')
  .length(5, 'Invalid ZIP')

const zipLast4Schema = z.string().trim().max(4, 'Invalid area code!').optional()

export { zipCodeSchema, zipLast4Schema }
