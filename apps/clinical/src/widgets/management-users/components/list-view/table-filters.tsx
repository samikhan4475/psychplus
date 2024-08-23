import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormDatePicker,
  FormSelect,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { cn } from '@psychplus/ui/cn'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FilterButtonGroup, FilterField } from '../shared'

const schema = z.object({
  name: validate.optionalString,
  userType: validate.optionalString,
  practice: validate.optionalString,
  status: validate.optionalString,
  dob: z.date().optional(),
  gender: validate.optionalString,
  language: validate.optionalString,
  email: validate.optionalString,
  phone: validate.optionalString,
  homeAddress: validate.optionalString,
  clear: validate.optionalString,
})

type SchemaType = z.infer<typeof schema>

const options = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Test',
    value: 'Test',
  },
]

const formFieldClasses =
  '[box-shadow:inset_0_0_0_1px_#01062F2C] h-6 text-[12px] px-2'

const TableFilters = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      userType: '',
      practice: '',
      status: '',
      // dob: ,
      gender: '',
      language: '',
      email: '',
      phone: '',
      homeAddress: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // TODO: Remove this log during API integration
    console.log(data)
  }

  return (
    <FormContainer
      form={form}
      formClassName={
        'rounded-[4px] [box-shadow:0_4px_4px_0_#00000014] my-[5px] bg-[#FFFFFF]'
      }
      onSubmit={onSubmit}
      className={'flex-row flex-wrap gap-x-1.5 rounded-[4px] px-2 py-1'}
    >
      <FilterField label="Name">
        <FormTextInput
          label=""
          className="h-6 w-[120px] text-[12px]"
          placeholder="Search"
          {...form.register('name')}
        />
      </FilterField>
      <FilterField label="User Type ">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          placeholder="Select"
          options={options}
          {...form.register('userType')}
        />
      </FilterField>
      <FilterField label="Practice">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          placeholder="Select"
          options={options}
          {...form.register('practice')}
        />
      </FilterField>
      <FilterField label="Status">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          placeholder="Select"
          options={options}
          {...form.register('status')}
        />
      </FilterField>
      <FilterField label="DOB">
        <FormDatePicker
          buttonClassName={cn(
            'justify-between w-[120px] text-[#000000]',
            formFieldClasses,
          )}
          label=""
          placeholder="Start Date"
          reverse
          {...form.register('dob')}
        />
      </FilterField>
      <FilterField label="Gender">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          placeholder="Select"
          options={options}
          {...form.register('gender')}
        />
      </FilterField>
      <br />
      <FilterField label="Language">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          placeholder="Select"
          options={options}
          {...form.register('language')}
        />
      </FilterField>
      <FilterField label="Email">
        <FormTextInput
          label=""
          className="h-6 w-[120px] text-[12px]"
          placeholder="Search"
          {...form.register('email')}
        />
      </FilterField>
      <FilterField label="Phone">
        <FormTextInput
          label=""
          className="h-6 w-[120px] text-[12px]"
          placeholder="Search"
          {...form.register('phone')}
        />
      </FilterField>
      <FilterField label="Home Address">
        <FormTextInput
          label=""
          className="h-6 w-[120px] text-[12px]"
          placeholder="Search"
          {...form.register('homeAddress')}
        />
      </FilterField>
      <FilterButtonGroup />
    </FormContainer>
  )
}

export { TableFilters }
