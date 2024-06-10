'use client'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormTextInput,
  useForm,
} from '@psychplus/form';

import { z } from 'zod';

const schema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  email: z.string().optional(),
  submitterId: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  receiver: z.string().optional(),
  practiceName: z.string().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  addressLine2: z.string().optional(),
  zipcode: z.string().optional()
});

interface ISubmitter {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  submitterId?: string;
  contactPerson?: string;
  phone?: string;
  fax?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
}

type FieldType = "name" | "username" | "email" | "password" | "submitterId" | "contactPerson" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "zip" | "fax" | "receiver" | "practiceName" | "zipcode"

interface IProps {
  search: (data: ISubmitter) => void;
}

const formItems = [{
  key: 'Name',
  value: 'name'
}, {
  key: 'User Name',
  value: 'username'
}, {
  key: 'Email',
  value: 'email'
}, {
  key: 'Password',
  value: 'password'
}, {
  key: 'Submitter Id',
  value: 'submitterId'
}, {
  key: 'Contact Person',
  value: 'contactPerson'
}, {
  key: 'Phone',
  value: 'phone'
}, {
  key: 'Address 1',
  value: 'addressLine1'
}, {
  key: 'Address 2',
  value: 'addressLine2'
}, {
  key: 'City',
  value: 'city'
}, {
  key: 'State',
  value: 'state'
}, {
  key: 'Zip',
  value: 'zip'
}]

const Filter = (props: IProps) => {
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
      <Flex className='z-10'>
        <Flex wrap="wrap" direction="row" mb="2" gap="2">
          {formItems.map((item) => (
            <Box className='flex row items-center' key={item.value}>
              <Text className='mr-2'>{item.key}</Text>
              <FormTextInput
                label=''
                className='p-0 w-[100px] text-sm'
                {...form.register(item.value as FieldType)}
              />
            </Box>
          ))}
          <Box className='flex row items-center'>
            <Button
              highContrast
              variant="outline"
              className='mr-2'
              onClick={() => { form.clearErrors(); form.reset() }}
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
