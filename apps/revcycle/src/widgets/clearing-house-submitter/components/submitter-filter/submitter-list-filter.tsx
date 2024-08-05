'use client';

import {
  Form,
  useForm
} from '@psychplus/form';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes';
import { submitterFormSchema } from '../../schema/submitterForm.schema';
import { SubmitterItem } from '../types';

interface SubmitterListFilterProps {
  search: (data: SubmitterItem) => void;
}

const SubmitterListFilter = (props: SubmitterListFilterProps) => {
  const form = useForm({
    schema: submitterFormSchema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const onSubmit = () => {
    props.search(form.getValues())
  }

  const handleClear = () => {
    form.reset();
    onSubmit();
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex className='z-10 mt-2'>
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Name</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder='Search By Name'
              {...form.register('name')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">User Name</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder='Search By Name'
              {...form.register('username')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Email</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder='Search By Email'
              {...form.register('email')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Submitter ID</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder='Search By ID'
              {...form.register('submitterId')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Address 1</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder='Search By Address'
              {...form.register('addressLine1')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Address 2</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder=''
              {...form.register('addressLine2')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Contact Person</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder=''
              {...form.register('contactPerson')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Phone</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder=''
              {...form.register('phone')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Text className='mr-2' size="1" weight="bold">Fax</Text>
            <TextFieldInput
              className='p-0 h-30 text-sm'
              placeholder=''
              {...form.register('fax')}
            />
          </Box>
          <Box className='flex row items-center'>
            <Button
              highContrast
              variant="outline"
              className='mr-2'
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              color="gray"
              variant="solid"
              className='bg-[#151B4A]'
              highContrast
              onClick={() => onSubmit()}
            >
              <MagnifyingGlassIcon />
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Form>
  )
}

export { SubmitterListFilter };
