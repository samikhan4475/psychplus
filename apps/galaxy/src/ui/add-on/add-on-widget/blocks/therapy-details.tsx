'use client'

import { useEffect } from 'react'
import { Flex, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'

interface TherapyDetailProps {
  field: string
  label: string
  defaultValue: string
}

const TherapyDetail = ({ field, label, defaultValue }: TherapyDetailProps) => {
  const form = useFormContext()

  useEffect(() => {
    if (!form.watch(field)) {
      form.setValue(field, defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
