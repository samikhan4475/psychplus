'use client'

import { useEffect } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormDatePicker, useForm } from '@psychplus/form'

const schema = z.object({
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
})

interface ClaimHistory {
  dateFrom?: string
  dateTo?: string
}

const ClaimHistoryFilter = ({ search }: { search: (data: ClaimHistory) => void }) => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  useEffect(() => {
    onSubmit()
  }, [form.watch('dateFrom'), form.watch('dateTo')])

  const onSubmit = () => {
    const payload = form.getValues()

    search({
      dateFrom: payload?.dateFrom?.toISOString(),
      dateTo: payload?.dateTo?.toISOString(),
    })
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex>
        <Flex wrap="wrap" direction="row" mb="2" gap="2">
          <Box className="row flex items-center" key={'from'}>
            <Text className="mr-2">From</Text>
            <FormDatePicker
              label=""
              color="gray"
              buttonClassName="text-black shadow-black"
              {...form.register('dateFrom')}
            />
          </Box>

          <Box className="row flex items-center" key={'to'}>
            <Text className="mr-2">To</Text>
            <FormDatePicker
              label=""
              color="gray"
              buttonClassName="text-black shadow-black"
              {...form.register('dateTo')}
            />
          </Box>
        </Flex>
      </Flex>
    </Form>
  )
}

export { ClaimHistoryFilter }
