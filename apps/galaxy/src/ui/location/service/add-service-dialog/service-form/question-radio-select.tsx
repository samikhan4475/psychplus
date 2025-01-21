'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'
import { questions } from './data'
import { ServiceSchemaType } from './schema'

const QuestionRadioSelect = () => {
  const form = useFormContext<ServiceSchemaType>()
  const locationType = form.watch('locationType')
  return (
    <Flex direction="column" gap="2">
      {questions?.map((item) => {
        if (item.locationType && locationType !== item?.locationType) {
          return null
        }
        return (
          <FormFieldContainer
            className="flex-row items-center gap-2"
            key={item.name}
          >
            <RadioSelectSection
              label={item.label}
              field={item.name}
              options={item.options}
              onChange={() => form.trigger(item.name)}
              disabled={item.disabled}
            />
            <FormFieldError name={item.name} />
          </FormFieldContainer>
        )
      })}
    </Flex>
  )
}

export { QuestionRadioSelect }
