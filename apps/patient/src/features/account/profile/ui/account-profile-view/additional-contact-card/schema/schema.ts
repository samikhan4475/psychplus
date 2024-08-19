'use client'

import { z } from 'zod'

const schema = z.object({
  homeContactNumber: z
    .string()
    .trim()
    .min(1, 'Required')
    .length(10, 'Invalid home phone'),
  homeContactExtension: z.string().trim().optional(),
  homeContactComment: z.string().optional(),
  workContactNumber: z
    .string()
    .trim()
    .min(1, 'Required')
    .length(10, 'Invalid work phone'),
  workContactExtension: z.string().trim().optional(),
  workContactComment: z.string().optional(),
})

export { schema }
