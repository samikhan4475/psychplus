import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormDatePicker, FormSelect, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { MultiSelectField } from '@psychplus/ui/multi-select'

const schema = z.object({
  dateFrom: validate.optionalString,
  dateTo: validate.optionalString,
  author: validate.emptyOrStringArray,
  visitType: validate.emptyOrStringArray,
  visitTitle: validate.emptyOrStringArray,
  location: validate.emptyOrStringArray,
  service: validate.emptyOrStringArray,
  state: validate.emptyOrStringArray,
  practice: validate.emptyOrStringArray,
  organization: validate.emptyOrStringArray,
  status: validate.optionalString,
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

const LeftPanelFilters = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      author: [],
      visitType: [],
      visitTitle: [],
      location: [],
      service: [],
      state: [],
      practice: [],
      organization: [],
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: To be implemented when APIs are developed
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} formClassName="mt-2">
      <Grid columns="12" className="gap-2 px-2">
        <Box className="col-span-2">
          <FormDatePicker
            buttonClassName="justify-between text-[#000000] shadow-none border-none h-6 font-light [box-shadow:inset_0_0_0_1px_#01062F38] text-[12px] px-1"
            placeholder="Date From"
            dateFormat="MM/dd/yyyy"
            calendarClassName="mr-[0px] h-[16px] w-[16px]"
            reverse
            label="Date From"
            {...form.register('dateFrom')}
          />
        </Box>
        <Box className="col-span-2">
          <FormDatePicker
            buttonClassName="justify-between text-[#000000] shadow-none border-none h-6 font-light [box-shadow:inset_0_0_0_1px_#01062F38] text-[12px] px-1"
            placeholder="Date To"
            dateFormat="MM/dd/yyyy"
            calendarClassName="mr-[0px] h-[16px] w-[16px]"
            reverse
            label="Date To"
            {...form.register('dateTo')}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('author', vals)}
            label="Author"
            options={options}
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('visitType', vals)}
            label="Visit Type"
            options={options}
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('visitTitle', vals)}
            label="Visit Title"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('location', vals)}
            label="Location"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('service', vals)}
            label="Service"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('state', vals)}
            label="State"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('practice', vals)}
            label="Practice"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('organization', vals)}
            label="Organization"
            options={options}
          />
        </Box>
        <Box className="col-span-2">
          <FormSelect
            label="Status"
            buttonClassName={fieldClasses}
            placeholder="Select"
            options={options}
            {...form.register('status')}
          />
        </Box>
      </Grid>
    </FormContainer>
  )
}

export { LeftPanelFilters }
