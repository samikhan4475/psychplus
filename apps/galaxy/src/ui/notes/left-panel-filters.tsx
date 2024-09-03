import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { DatePickerInput, FormContainer, MultiSelectField } from '@/components'
import { StatusSelect } from './status-select'

const emptyOrStringArray = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const schema = z.object({
  dateFrom: z.custom<DateValue>(),
  dateTo: z.custom<DateValue>(),
  author: emptyOrStringArray,
  visitType: emptyOrStringArray,
  visitTitle: emptyOrStringArray,
  location: emptyOrStringArray,
  service: emptyOrStringArray,
  state: emptyOrStringArray,
  practice: emptyOrStringArray,
  organization: emptyOrStringArray,
  status: z.string().optional().default(''),
})

type NotesFilterSchemaType = z.infer<typeof schema>

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

const LeftPanelFilters = () => {
  const form = useForm<NotesFilterSchemaType>({
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

  const onSubmit: SubmitHandler<NotesFilterSchemaType> = () => {
    console.log('Todo Api Request')
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="12" className="gap-2">
        <Box className="col-span-2">
          <DatePickerInput
            label="Date From"
            field="dateFrom"
            aria-label="date-to-filter-input"
          />
        </Box>
        <Box className="col-span-2">
          <DatePickerInput
            label="Date To"
            field="dateTo"
            aria-label="date-to-filter-input"
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
            menuClassName="w-[155px]"
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            defaultValues={['test1', 'test2']}
            onChange={(vals) => form.setValue('visitTitle', vals)}
            label="Visit Title"
            options={options}
            menuClassName="w-[155px]"
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
          <StatusSelect />
        </Box>
      </Grid>
    </FormContainer>
  )
}

export { LeftPanelFilters, type NotesFilterSchemaType }
