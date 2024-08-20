'use client'

import { z } from 'zod'

const schema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  lastName: z.string().trim().min(1, 'Required'),
  middleName: z.string().optional(),
  title: z.string().trim().optional(),
  suffix: z.string().trim().optional(),
  honors: z.string().trim().optional(),
  street1: z.string().min(1, 'Required'),
  street2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  postalCode: z.string().min(1, 'Required'),
})

export { schema }
