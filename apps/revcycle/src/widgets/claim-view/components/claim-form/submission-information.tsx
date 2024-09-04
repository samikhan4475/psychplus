'use client'

import { useState } from 'react'
import { Box, Flex, Text, TextArea } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { Checkbox } from '@psychplus/ui/checkbox'
import { DatePicker } from '@psychplus/ui/date-picker'
import { SchemaType } from './add-claim-form'

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
          <Text size="2" className="pb-1 font-bold">
            Submission Date
          </Text>
          <DatePicker
            date={submissionDate}
            onSelect={setSubmissionDate}
            buttonClassName="w-[100%] bg-[#00005506] justify-between text-left font-regular h-[36px]"
            reverse={true}
            color="gray"
            placeholder="mm/dd/yyyy"
            disabled={true}
          />
        </Box>
        <Box className="flex-1">
          <FormTextInput
            type="text"
            label="Submission Batch #"
            data-testid="submission-batch"
            {...form.register('submittedDate')}
            disabled={true}
          />
        </Box>
        <Box className="flex-1">
          <FormTextInput
            type="text"
            label="System Validation Message"
            data-testid="system-validation-message"
            {...form.register('submittedDate')}
            disabled={true}
          />
        </Box>
      </Flex>
      <Flex>
        <Box className="flex-1">
          <Text className="rt-Text rt-r-size-2 rt-r-weight-bold">
            Rejection Reason
          </Text>
          <TextArea
            className="w-[100%]"
            {...form.register('submittedDate')}
            disabled={true}
          />
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
