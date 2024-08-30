'use client'

import { useState } from 'react'
import { Box, Flex, Text, TextArea } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { Checkbox } from '@psychplus/ui/checkbox'
import { DatePicker } from '@psychplus/ui/date-picker'
import { SchemaType } from './add-claim-form'
import TextFieldLabel from './text-field'

const SubmissionInformation = ({
  form,
}: {
  form: UseFormReturn<SchemaType>
}) => {
  const [submissionDate, setSubmissionDate] = useState<Date | undefined>()

  return (
    <>
      <Flex gap="3">
        <Box className="flex-1">
          <Text size="1">Submission Date</Text>
          <DatePicker
            date={submissionDate}
            onSelect={setSubmissionDate}
            buttonClassName="w-[100%] justify-between text-left font-regular"
            reverse={true}
            color="gray"
            placeholder="mm/dd/yyyy"
          />
        </Box>
        <Box className="flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.referralNumber?.message}
            type="text"
            label="Submission Batch #"
            register={form.register('submittedDate')}
            disabled={true}
          />
        </Box>
        <Box className="flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.referralNumber?.message}
            type="text"
            label="System Validation Message"
            register={form.register('isSubmitted')}
            disabled={true}
          />
        </Box>
      </Flex>
      <Flex>
        <Box className="flex-1">
          <Text>Rejection Reason</Text>
          <TextArea className="w-[100%]" />
        </Box>
      </Flex>
      <Flex className="mt-2">
        <Box className="flex-1">
          <Checkbox defaultChecked={false} />{' '}
          <Text className="text-bold pb-2">Submitted</Text>
        </Box>
      </Flex>
    </>
  )
}

export { SubmissionInformation }
