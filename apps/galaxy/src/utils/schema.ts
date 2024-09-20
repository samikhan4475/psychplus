import { z } from 'zod'

const zipCodeSchema = z
  .string()
  .trim()
  .min(1, 'Required')
  .length(5, 'Invalid ZIP')

export { zipCodeSchema }
