import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormDatePicker, FormSelect, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { FilterButtonGroup, FilterField } from '../shared'
import { cn } from '@psychplus/ui/cn'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: validate.optionalString,
  state: validate.optionalString,
  location: validate.optionalString,
  service: validate.optionalString,
  provider: validate.optionalString,
  providerType: validate.optionalString,
  gender: validate.optionalString,
  timeOfTheDay: validate.optionalString,
  language: validate.optionalString,
  firstResponder: validate.optionalString,
})

type SchemaType = z.infer<typeof schema>

const options = [
  {
    label: 'Test1',
    value: 'Test1',
  },
  {
    label: 'Test2',
    value: 'Test2',
  },
  {
    label: 'Test3',
    value: 'Test3',
  },
]

const formFieldClasses =
  '[box-shadow:inset_0_0_0_1px_#01062F2C] h-6 text-[12px] px-2'

const SchedulerFilters = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: '',
      location: '',
      service: '',
      provider: '',
      providerType: '',
      gender: '',
      timeOfTheDay: '',
      language: '',
      firstResponder: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    //TODO: Remove log once APIs are integrated
    console.log(data)
  }

  return (
    <FormContainer
      form={form}
      formClassName={'mx-[22px] rounded-[4px] [box-shadow:0_4px_4px_0_#00000014] mt-[1.5px] bg-[#FFFFFF]'}
      onSubmit={onSubmit}
      className={'flex-row flex-wrap gap-x-1.5 rounded-[4px] px-2 py-1'}
    >
      <FilterField label="From">
        <FormDatePicker
          buttonClassName={cn('justify-between w-[120px] text-[#000000]', formFieldClasses)}
          label=""
          placeholder="Start Date"
          reverse
          {...form.register('startDate')}
        />
      </FilterField>
      <FilterField label="To">
        <FormDatePicker
          buttonClassName={cn('justify-between w-[120px] text-[#000000]', formFieldClasses)}
          label=""
          placeholder="End Date"
          reverse
          {...form.register('endDate')}
        />
      </FilterField>
      <FilterField label="State">
        <FormSelect
          buttonClassName={cn('w-[190px]', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select State'
          {...form.register('state')}
        />
      </FilterField>
      <FilterField label="Location">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select'
          {...form.register('location')}
        />
      </FilterField>
      <FilterField label="Service">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select'
          {...form.register('service')}
        />
      </FilterField>
      <FilterField label="Provider">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select'
          {...form.register('provider')}
        />
      </FilterField>
      <FilterField label="Provider Type">
        <FormSelect
          buttonClassName={cn('w-48', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select'
          {...form.register('providerType')}
        />
      </FilterField>
      <FilterField label="Gender">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          placeholder='Select Gender'
          {...form.register('gender')}
        />
      </FilterField>
      <FilterField label="Time of the day">
        <FormSelect
          buttonClassName={cn('w-[144px]', formFieldClasses)}
          placeholder="Select"
          label=""
          options={options}
          {...form.register('timeOfTheDay')}
        />
      </FilterField>
      <FilterField label="Language">
        <FormSelect
          buttonClassName={cn('w-[131px]', formFieldClasses)}
          placeholder="Select"
          label=""
          options={options}
          {...form.register('language')}
        />
      </FilterField>
      <FilterField label="First Responder">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          placeholder="Select"
          label=""
          options={options}
          {...form.register('firstResponder')}
        />
      </FilterField>
      <FilterButtonGroup className="flex-1" />
    </FormContainer>
  )
}

export { SchedulerFilters }
