import { z } from 'zod'

const createQuestionnaireSchema = (totalQuestions: number) => {
  const schemaShape: Record<string, z.ZodType> = {}

  for (let i = 1; i <= totalQuestions; i++) {
    schemaShape[`Q${i}`] = z.string().nullable()
  }

  return z.object(schemaShape)
}

type QuestionnaireSchemaType = {
  [key: string]: string
}

export { createQuestionnaireSchema, type QuestionnaireSchemaType }
