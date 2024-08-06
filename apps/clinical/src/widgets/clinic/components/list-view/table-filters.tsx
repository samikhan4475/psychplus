import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormDatePicker, FormSelect, FormTextInput, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { FilterButtonGroup, FilterField } from '../shared'
import { FIELDSET_CLASSES, FORM_CLASSES } from '../../constants'
import { cn } from '@psychplus/ui/cn'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  name: validate.optionalString,
  age: z.number().optional(),
  gender: validate.optionalString,
  ptStatus: validate.optionalString,
  state: validate.optionalString,
  location: validate.optionalString,
  provider: validate.optionalString,
  providerType: validate.optionalString,
  visitType: validate.optionalString,
  visitSequence: validate.optionalString,
  visitMedium: validate.optionalString,
  insVerification: validate.optionalString,
  primaryInsurance: validate.optionalString,
  secondaryInsurance: validate.optionalString,
  signedNote: validate.optionalString,
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
      gender: 'Test',
      ptStatus: 'Test',
      state: 'Test',
      location: 'Test',
      provider: 'Test',
      providerType: 'Test',
      visitType: 'Test',
      visitSequence: 'Test',
      visitMedium: 'Test',
      insVerification: 'Test',
      primaryInsurance: 'Test',
      secondaryInsurance: 'Test',
      signedNote: 'Test',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    //TODO: Remove log once APIs are integrated
    console.log(data)
  }

  return (
    <FormContainer
      form={form}
      formClassName={FORM_CLASSES}
      onSubmit={onSubmit}
      className={FIELDSET_CLASSES}
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
      <FilterField label="Name">
        <FormTextInput
          label=""
          className="h-6 w-[120px] text-[12px]"
          placeholder="Search by name"
          {...form.register('name')}
        />
      </FilterField>
      <FilterField label="Age">
        <FormTextInput
          className="h-6 w-[76px] text-[12px]"
          label=""
          placeholder="Add age"
          {...form.register('age')}
        />
      </FilterField>
      <FilterField label="Gender">
        <FormSelect
          buttonClassName={cn('w-[85px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('gender')}
        />
      </FilterField>
      <FilterField label="Pt Status">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('ptStatus')}
        />
      </FilterField>
      <FilterField label="State">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('state')}
        />
      </FilterField>
      <FilterField label="Location">
        <FormSelect
          buttonClassName={cn('w-[274px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('location')}
        />
      </FilterField>
      <FilterField label="Provider">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('provider')}
        />
      </FilterField>
      <FilterField label="Provider Type">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('providerType')}
        />
      </FilterField>
      <FilterField label="Visit Type">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('visitType')}
        />
      </FilterField>
      <FilterField label="Visit Sequence">
        <FormSelect
          label=""
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          options={options}
          {...form.register('visitSequence')}
        />
      </FilterField>
      <FilterField label="Visit Medium">
        <FormSelect
          buttonClassName={cn('w-[102px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('visitMedium')}
        />
      </FilterField>
      <FilterField label="Ins Verification">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('insVerification')}
        />
      </FilterField>
      <FilterField label="Primary Insurance">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('primaryInsurance')}
        />
      </FilterField>
      <FilterField label="Secondary Insurance">
        <FormSelect
          buttonClassName={cn('w-[120px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('secondaryInsurance')}
        />
      </FilterField>
      <FilterField label="Signed Note">
        <FormSelect
          buttonClassName={cn('w-[128px]', formFieldClasses)}
          label=""
          options={options}
          {...form.register('signedNote')}
        />
      </FilterField>
      <FilterButtonGroup className="flex-1" />
    </FormContainer>
  )
}

export { TableFilters }
