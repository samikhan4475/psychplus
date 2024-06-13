'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormDatePicker, useForm, validate } from '@psychplus/form'

const schema = z.object({
  previousValue: validate.anyString.optional(),
  currentValue: validate.anyString.optional(),
})

interface ClaimHistory {
  date: string
  name: string
  section: string
  field: string
  previousValue: string
  currentValue: string
}

interface Props {
  search: (data: ClaimHistory) => void
}

const Filter = (props: Props) => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const onSubmit = () => {
    // TODO: Search API needed to integerate
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex className="z-10">
        <Flex wrap="wrap" direction="row" mb="2" gap="2">
          <Box className="row flex items-center" key={'from'}>
            <Text className="mr-2">From</Text>
            <FormDatePicker label="" {...form.register('previousValue')} />
          </Box>

          <Box className="row flex items-center" key={'to'}>
            <Text className="mr-2">To</Text>
            <FormDatePicker label="" {...form.register('currentValue')} />
          </Box>
        </Flex>
      </Flex>
    </Form>
  )
}

export { Filter }
