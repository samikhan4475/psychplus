import { z } from 'zod'

type BaseQuestionnaireFields = {
  [key: `Q${number}`]: string
}

type TograCustomFields = {
  TograBlueSubmittedDate: string
  TograBlueCompletedDuration: string
  TograBlueStartedAt: string
}

type TograSchemaType = BaseQuestionnaireFields &
  TograCustomFields & {
    [key: string]: string
  }

const tograSchema = z.object({
  TograBlueSubmittedDate: z.string().nullable(),
  TograBlueCompletedDuration: z.string().nullable(),
  TograBlueStartedAt: z.string().nullable(),
})

export { tograSchema, type TograSchemaType }
