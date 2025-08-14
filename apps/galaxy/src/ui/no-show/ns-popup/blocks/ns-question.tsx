import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AlertMessage } from '@/ui/alerts'
import { RadioButton } from '@/ui/questionnaires/shared'
import { QuestionParams } from '../types'

export const NoShowQuestion = ({
  question,
  options,
  alert,
  field,
  dependantField,
  dependantValue,
  errorValue,
}: QuestionParams) => {
  const { watch, setValue, formState } = useFormContext()
  const isSubmitting = formState.isSubmitting
  const dependantFieldValue = watch(dependantField)
  const fieldValue = watch(field)
  const [showError, setshowError] = useState(false)

  const shouldClearField = dependantField !== 'q0'
  const shouldShowQuestion =
    dependantField === 'q0' || dependantFieldValue === dependantValue

  useEffect(() => {
    setshowError(fieldValue === errorValue)
  }, [fieldValue])

  useEffect(() => {
    if (shouldClearField) {
      setValue(field, undefined)
    }
  }, [dependantFieldValue])

  if (shouldShowQuestion) {
    return (
      <Flex className=" flex-col gap-1">
        <Flex className=" bg-pp-bg-accent flex-row items-center justify-between gap-2 px-3 py-2">
          <Text size="1" weight="medium">
            {question}
          </Text>
          <RadioButton
            className=" flex flex-row gap-2"
            field={field}
            options={options}
            disabled={isSubmitting}
          />
        </Flex>
        {showError && <AlertMessage message={alert} />}
      </Flex>
    )
  }
  return null
}
