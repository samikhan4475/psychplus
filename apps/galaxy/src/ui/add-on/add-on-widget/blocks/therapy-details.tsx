'use client'

import { Flex, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'

interface TherapyDetailProps {
  field: string
  label: string
}

const TherapyDetail = ({ field, label }: TherapyDetailProps) => {
  const form = useFormContext()

  return (
    <Flex gap="2" align="start">
      <BlockLabel name={field} required>
        {label}
      </BlockLabel>
      <Flex direction={'column'}>
        <TextArea
          size="1"
          className="h-[90px] w-[800px] flex-grow"
          {...form.register(field)}
        />
        <FormFieldError name={field} />
      </Flex>
    </Flex>
  )
}

export { TherapyDetail }
