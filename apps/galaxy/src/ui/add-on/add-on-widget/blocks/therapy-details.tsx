'use client'

import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

interface TherapyDetailProps {
  field: string
  label: string
}

const TherapyDetail = ({ field, label }: TherapyDetailProps) => {
  return (
    <Flex gap="2" align="start">
      <BlockLabel name={field} required>
        {label}
      </BlockLabel>
      <Flex direction={'column'}>
        <AutoResizeInput
          field={field}
          className="min-h-[90px] min-w-[800px] resize"
          maxLength={4000}
        />
        <FormFieldError name={field} />
      </Flex>
    </Flex>
  )
}

export { TherapyDetail }
