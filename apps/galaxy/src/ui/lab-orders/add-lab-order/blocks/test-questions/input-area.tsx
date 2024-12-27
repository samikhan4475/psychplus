import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectInput, TextInput } from '@/components'
import { ControlType, Option, Question } from '../types'

const InputArea = ({
  id,
  question,
  defaultValue = '',
}: {
  id: string
  question: Question
  defaultValue: string
}) => {
  const form = useFormContext()

  useEffect(() => {
    form.setValue(
      `labQuestions[${id}_${question.questionCode}].isRequired`,
      question.isMandatory,
    )
    form.setValue(
      `labQuestions[${id}_${question.questionCode}].answer`,
      defaultValue,
    )
  }, [])

  const getOptions = (options: Option[]) => {
    return options.length > 0
      ? options.map((item) => ({
          value: item.optionKey,
          label: item.optionValue,
        }))
      : []
  }

  if (question.controlType === ControlType.OptionSelect) {
    return (
      <SelectInput
        field={`labQuestions[${id}_${question.questionCode}].answer`}
        options={getOptions(question?.options ?? [])}
        buttonClassName="w-full h-6"
        defaultValue={defaultValue}
      />
    )
  }
  return (
    <TextInput
      field={`labQuestions[${id}_${question.questionCode}].answer`}
      className="h-6 w-full"
      placeHolder="Answer"
      maxLength={128}
    />
  )
}

export { InputArea }
