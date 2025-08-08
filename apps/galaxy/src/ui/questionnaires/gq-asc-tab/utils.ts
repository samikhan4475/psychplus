import { Option } from '@/ui/schedule/types'

const createQuestions = (
  startIndex: number,
  questions: string[],
  options: Option[],
) =>
  questions.map((question, index) => ({
    id: `Q${startIndex + index}`,
    question,
    value: 1,
    options,
  }))

export { createQuestions }
