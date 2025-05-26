import z from 'zod'
import { zipLast4Schema } from '@/utils'

const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)|^$/

const locationSchema = z.object({
  id: z.string().optional(),
  locationNameGenerated: z.string().optional(),
  locationType: z.string().min(1, 'required'),
  name: z.string().min(1, 'Required'),
  npi: z
    .string()
    .min(10, '10 characters Required')
    .max(10, '10 characters Required'),
  phone: z.object({
    number: z.string().optional(),
    type: z.string(),
  }),
  fax: z.object({
    number: z.string().optional(),
    type: z.string(),
  }),
  recordStatus: z.string().min(1, 'Required'),
  isTestLocation: z.string(),
  address: z.object({
    type: z.string(),
    address1: z.string().trim().min(1, 'Required'),
    address2: z.string().optional(),
    state: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    zip: z
      .string()
      .trim()
      .regex(zipCodeRegex, 'Invalid zip code!')
      .min(1, 'Required'),
    zipLast4: zipLast4Schema,
  }),
  locationGoogleLink: z.string().url('Invalid link').or(z.literal('')),
})

type LocationSchemaType = z.infer<typeof locationSchema>

export { locationSchema, type LocationSchemaType }
