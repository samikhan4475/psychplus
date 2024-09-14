import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormDatePicker, FormSelect, validate } from '@psychplus/form'
import { cn } from '@psychplus/ui/cn'
import { FormContainer } from '@psychplus/ui/form/form-container'
import {
  useGenderOptions,
  useLanguageOptions,
  useProviderOptions,
  useServiceOptions,
  useSpecialistTypeOptions,
  useUsStatesOptions,
} from '../../hooks'
import { FilterButtonGroup, FilterField } from '../shared'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  state: validate.nullableString,
  location: validate.nullableString,
  service: validate.nullableString,
  provider: validate.nullableString,
  providerType: validate.nullableString,
  gender: validate.nullableString,
  timeOfTheDay: validate.nullableString,
  language: validate.nullableString,
  isFirstResponder: validate.nullableString,
  maxDaysOutToLook: validate.nullOrNumber,
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

const firstResponderOptions = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]

const timeOfTheDay = [
  {
    label: 'Evening',
    value: 'evening',
  },
  {
    label: 'Morning',
    value: 'morning',
  },
]

const SchedulerFilters = () => {
  const usStateOptions = useUsStatesOptions()
  const servicesOffered = useServiceOptions()
  const specialistTypeOptions = useSpecialistTypeOptions()
  const genderOptions = useGenderOptions()
  const languageOptions = useLanguageOptions()
  const providerOptions = useProviderOptions()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      state: '',
      location: '',
      service: '',
      provider: '',
      providerType: '',
      gender: '',
      timeOfTheDay: '',
      language: '',
      isFirstResponder: '',
      maxDaysOutToLook: 90,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: This will be implemented when the backend blockers are resolved
  }

  return (
    <FormContainer
      form={form}
      formClassName={
        'mx-[22px] rounded-[4px] [box-shadow:0_4px_4px_0_#00000014] mt-[1.5px] bg-[#FFFFFF]'
      }
      onSubmit={onSubmit}
      className={'flex-row flex-wrap gap-x-1.5 rounded-[4px] px-2 py-1'}
    >
      <FilterField label="From">
        <FormDatePicker
          buttonClassName={cn(
            'justify-between w-[120px] text-[#000000]',
            formFieldClasses,
          )}
          label=""
          placeholder="Start Date"
          dateFormat="yyyy-MM-dd"
          reverse
          {...form.register('startDate')}
        />
      </FilterField>
      <FilterField label="To">
        <FormDatePicker
          buttonClassName={cn(
            'justify-between w-[120px] text-[#000000]',
            formFieldClasses,
          )}
          label=""
          placeholder="End Date"
          dateFormat="yyyy-MM-dd"
          reverse
          {...form.register('endDate')}
        />
      </FilterField>
      <FilterField label="State">
        <FormSelect
          buttonClassName={cn('w-[190px]', formFieldClasses)}
          label=""
          options={usStateOptions}
          contentClassName="max-h-[250px]"
          placeholder="Select State"
          {...form.register('state')}
        />
      </FilterField>
      <FilterField label="Location">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={options}
          placeholder="Select"
          {...form.register('location')}
        />
      </FilterField>
      <FilterField label="Service">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={servicesOffered}
          contentClassName="max-h-[250px]"
          placeholder="Select"
          {...form.register('service')}
        />
      </FilterField>
      <FilterField label="Provider">
        <FormSelect
          buttonClassName={cn('w-[166px]', formFieldClasses)}
          label=""
          options={providerOptions}
          contentClassName="max-h-[250px]"
          placeholder="Select"
          {...form.register('provider')}
        />
      </FilterField>
      <FilterField label="Provider Type">
        <FormSelect
          buttonClassName={cn('w-48', formFieldClasses)}
          label=""
          options={specialistTypeOptions}
          placeholder="Select"
          {...form.register('providerType')}
        />
      </FilterField>
      <FilterField label="Gender">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={genderOptions}
          placeholder="Select Gender"
          {...form.register('gender')}
        />
      </FilterField>
      <FilterField label="Time of the day">
        <FormSelect
          buttonClassName={cn('w-[144px]', formFieldClasses)}
          placeholder="Select"
          label=""
          options={timeOfTheDay}
          {...form.register('timeOfTheDay')}
        />
      </FilterField>
      <FilterField label="Language">
        <FormSelect
          buttonClassName={cn('w-[131px]', formFieldClasses)}
          placeholder="Select"
          contentClassName="max-h-[250px]"
          label=""
          options={languageOptions}
          {...form.register('language')}
        />
      </FilterField>
      <FilterField label="First Responder">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          placeholder="Select"
          label=""
          options={firstResponderOptions}
          {...form.register('isFirstResponder')}
        />
      </FilterField>
      <FilterButtonGroup className="flex-1" />
    </FormContainer>
  )
}

export { SchedulerFilters }
