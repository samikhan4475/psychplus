'use client'

import { zipCodeSchema, zipLast4Schema } from '@psychplus-v2/utils'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  lastName: z.string().trim().min(1, 'Required'),
  middleName: z.string().optional(),
  title: z.string().trim().optional(),
  suffix: z.string().trim().optional(),
  honors: z.string().trim().optional(),
  primaryStreet1: z.string().min(1, 'Required'),
  primaryStreet2: z.string().optional(),
  primaryCity: z.string().min(1, 'Required'),
  primaryPostalCode: zipCodeSchema,
  primaryZipLast4: zipLast4Schema,
})

export { schema }
