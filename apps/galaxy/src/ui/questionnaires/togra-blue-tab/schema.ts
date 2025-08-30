import { z } from 'zod'

type SchemaType = {
  [key: string]: string
}

const tograBlueSchema = z.object({
  TograBlueSubmittedDate: z.string().nullable(),
  TograBlueCompletedDuration: z.string().nullable(),
  TograBlueStartedAt: z.string().nullable(),
})

export { tograBlueSchema, type SchemaType }
