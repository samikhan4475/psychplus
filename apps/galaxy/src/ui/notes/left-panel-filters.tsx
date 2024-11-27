import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsoluteToLocal } from '@internationalized/date' // Utility to convert JS Date to DateValue
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  getClinicsOptionsAction,
  getProvidersOptionsAction,
  getUsStatesOptionsAction,
} from '@/actions'
import { DatePickerInput, FormContainer, MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import {
  getOrganizationOptionsAction,
  getPracticesOptionsAction,
} from '../patient-lookup/actions'
import { getVisitTypesAction } from '../scheduling-history/actions'
import { ClearButton } from './clear-button'
import { StatusSelect } from './status-select'
import { useStore } from './store'

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

const LeftPanelFilters = ({ patientId }: { patientId: string }) => {
  const form = useForm<NotesFilterSchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      dateFrom: parseAbsoluteToLocal(
        new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      ),
      dateTo: parseAbsoluteToLocal(new Date().toISOString()),
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

  const { fetch } = useStore((state) => ({
    fetch: state.fetch,
  }))

  const onSubmit: SubmitHandler<NotesFilterSchemaType> = (data) => {
    const payload = {
      patientId,
      dateFrom: formatDateToISOString(data.dateFrom) ?? '',
      dateTo: formatDateToISOString(data.dateTo) ?? '',
      authorIds: data.author.map(Number),
      visitTypeIds: data.visitType.map(Number),
      locationIds: data.location,
      locationServicesIds: data.service,
      stateIds: data.state,
      practiceIds: data.practice,
      organizationIds: data.organization,
      status: data.status,
    }

    fetch(sanitizeFormData(payload))
  }

  const [locations, setLocations] = useState<SelectOptionType[]>([])
  const [states, setStates] = useState<SelectOptionType[]>([])
  const [visitTypes, setVisitTypes] = useState<SelectOptionType[]>([])
  const [providers, setProviders] = useState<SelectOptionType[]>([])
  const [practices, setPractices] = useState<SelectOptionType[]>([])
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])

  const fetchData = async (
    action: Function,
    setter: React.Dispatch<React.SetStateAction<SelectOptionType[]>>,
  ) => {
    const res = await action()
    if (res.state === 'success') {
      setter(res.data)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(getClinicsOptionsAction, setLocations),
        fetchData(getUsStatesOptionsAction, setStates),
        fetchData(getVisitTypesAction, setVisitTypes),
        fetchData(getProvidersOptionsAction, setProviders),
        fetchData(getPracticesOptionsAction, setPractices),
        fetchData(getOrganizationOptionsAction, setOrganizations),
      ])
    }
    fetchAllData()
  }, [])

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
            onChange={(vals) => form.setValue('author', vals)}
            label="Author"
            options={providers}
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            onChange={(vals) => form.setValue('visitType', vals)}
            label="Visit Type"
            options={visitTypes}
            menuClassName="w-[155px]"
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            onChange={(vals) => form.setValue('location', vals)}
            label="Location"
            options={locations}
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
            onChange={(vals) => form.setValue('state', vals)}
            label="State"
            options={states}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            onChange={(vals) => form.setValue('practice', vals)}
            label="Practice"
            options={practices}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            onChange={(vals) => form.setValue('organization', vals)}
            label="Organization"
            options={organizations}
          />
        </Box>
        <Box className="col-span-2">
          <StatusSelect />
        </Box>

        <Box className="col-span-2">
          <Flex className=" h-full items-end justify-end" gap="1">
            <ClearButton patientId={patientId} />
            <Button highContrast size="1" type="submit">
              <MagnifyingGlassIcon strokeWidth={2} />
            </Button>
          </Flex>
        </Box>
      </Grid>
    </FormContainer>
  )
}

export { LeftPanelFilters, type NotesFilterSchemaType }
