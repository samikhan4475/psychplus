import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Text, TextArea } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormDatePicker,
  FormSelect,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'

const schema = z.object({
  date: validate.optionalString,
  time: validate.optionalString,
  visitType: validate.optionalString,
  visitTitle: validate.optionalString,
  provider: validate.optionalString,
  cosigner: validate.optionalString,
  description: validate.optionalString,
})

type SchemaType = z.infer<typeof schema>

const options = [
  {
    label: 'test1',
    value: 'test1',
  },
  {
    label: 'test2',
    value: 'test2',
  },
  {
    label: 'test3',
    value: 'test3',
  },
  {
    label: 'test4',
    value: 'test4',
  },
]

const fieldClasses = 'h-6 text-[12px]'

const Description = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      date: undefined,
      time: undefined,
      visitType: '',
      visitTitle: '',
      provider: '',
      cosigner: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: To be implemented when APIs are developed
  }

  return (  
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="relative gap-x-2 border-b border-[#dfe3ed] py-2 px-2">
        <FormDatePicker
          buttonClassName="justify-between text-[#000000] shadow-none border-none h-6 font-light [box-shadow:inset_0_0_0_1px_#01062F38] text-[12px] px-1"
          placeholder="Date From"
          dateFormat="MM/dd/yyyy"
          calendarClassName="mr-[0px] h-[16px] w-[16px]"
          reverse
          label="Date"
          {...form.register('date')}
        />
        <FormTextInput 
          type='time'
          label='Time'
          className={fieldClasses}
          {...form.register('time')}
        />
        <Box className="flex-1">
          <FormSelect
            label="Visit Type"
            placeholder="Select"
            options={options}
            buttonClassName={fieldClasses}
            {...form.register('visitType')}
          />
        </Box>
        <Box className="flex-1">
          <FormSelect
            label="Visit Title"
            placeholder="Select"
            options={options}
            buttonClassName={fieldClasses}
            {...form.register('visitTitle')}
          />
        </Box>
        <Box className="flex-1">
          <FormSelect
            label="Provider"
            placeholder="Select"
            options={options}
            buttonClassName={fieldClasses}
            {...form.register('provider')}
          />
        </Box>
        <Box className="flex-1">
          <FormSelect
            label="Cosigner"
            placeholder="Select"
            options={options}
            buttonClassName={fieldClasses}
            {...form.register('cosigner')}
          />
        </Box>
      </Flex>
      <Box className='pl-2'>
        <Text className='text-[14px] font-[510] mb-2'>Description</Text>
        <TextArea
          placeholder="Description"
          size='3'
          className="max-w-[639px] rounded-[4px] px-3 py-3.5 focus:border-accent-6 active:border-accent-6 text-[12px]"
          {...form.register('description')}
        />
      </Box>
    </FormContainer>
  )
}

export { Description }
