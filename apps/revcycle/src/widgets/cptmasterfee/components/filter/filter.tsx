'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormTextInput, useForm, validate } from '@psychplus/form'

type CptType =
  | 'cptCode'
  | 'placeOfService'
  | 'macLocality'
  | 'description'
  | 'service'
  | 'category'
  | 'gender'
  | 'minimumAge'
  | 'maximumAge'
const schema = z.object({
  cptCode: validate.anyString.optional(),
  placeOfService: validate.anyString.optional(),
  macLocality: validate.anyString.optional(),
  description: validate.anyString.optional(),
  service: validate.anyString.optional(),
  category: validate.anyString.optional(),
  gender: validate.anyString.optional(),
  minimumAge: validate.anyString.optional(),
  maximumAge: validate.anyString.optional(),
})

interface CPT {
  macLocality?: string
  hcpcsCodes?: string[]
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string
}

interface Props {
  search: (data: CPT) => void
}

const formItems = [
  {
    key: 'CPT',
    value: 'cptCode',
  },
  {
    key: 'POS',
    value: 'placeOfService',
  },
  {
    key: 'MCD',
    value: 'macLocality',
  },
  {
    key: 'Description',
    value: 'description',
  },
  {
    key: 'Categroy',
    value: 'category',
  },
  {
    key: 'Gender',
    value: 'gender',
  },
  {
    key: 'Age',
    value: 'minimumAge',
  },
  {
    key: '',
    value: 'maximumAge',
  },
  {
    key: 'Status',
    value: 'resourceStatusList',
  },
]

const Filter = (props: Props) => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const onSubmit = () => {
    props.search(form.getValues())
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex className="z-10">
        <Flex wrap="wrap" direction="row" mb="2" gap="2">
          {formItems.map((item) => (
            <Box className="row flex items-center" key={item.value}>
              <Text className="mr-2">{item.key}</Text>
              <FormTextInput
                label=""
                className="text-sm w-[100px] p-0"
                {...form.register(item.value as CptType)}
              />
            </Box>
          ))}
          <Box className="row flex items-center">
            <Button
              highContrast
              variant="outline"
              className="mr-2"
              onClick={() => {
                form.clearErrors()
                form.reset()
              }}
            >
              Clear
            </Button>
            <Button
              color="gray"
              variant="solid"
              highContrast
              onClick={() => onSubmit()}
            >
              <MagnifyingGlassIcon width="15" height="15" />
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Form>
  )
}

export { Filter }
