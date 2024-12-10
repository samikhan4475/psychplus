import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate } from '@internationalized/date'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  getClinicsOptionsAction,
  getProvidersOptionsAction,
  getUsStatesOptionsAction,
} from '@/actions'
import { DatePickerInput, FormContainer, MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
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

const today = new Date()
const threeeMonthsAgo = new Date()
threeeMonthsAgo.setMonth(today.getMonth() - 3)

const LeftPanelFilters = ({ patientId }: { patientId: string }) => {
  const form = useForm<NotesFilterSchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      dateFrom: new CalendarDate(
        threeeMonthsAgo.getFullYear(),
        threeeMonthsAgo.getMonth() + 1,
        threeeMonthsAgo.getDate(),
      ),
      dateTo: new CalendarDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      ),
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

  const { fetch, loading } = useStore((state) => ({
    fetch: state.fetch,
    loading: state.loading,
  }))

  const onSubmit: SubmitHandler<NotesFilterSchemaType> = (data) => {
    if (data.dateFrom && data.dateTo && data.dateTo < data.dateFrom) {
      toast.error('To date must be greater than From date')
      return
    }

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
  const serviceCodes = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])

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
            isDisabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <DatePickerInput
            label="Date To"
            field="dateTo"
            aria-label="date-to-filter-input"
            isDisabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={form.watch('author') ?? []}
            onChange={(vals) => form.setValue('author', vals)}
            label="Author"
            options={providers}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            defaultValues={form.watch('visitType') ?? []}
            onChange={(vals) => form.setValue('visitType', vals)}
            label="Visit Type"
            options={visitTypes}
            menuClassName="w-[155px]"
            disabled={loading}
          />
        </Box>
        <Box className="col-span-3">
          <MultiSelectField
            defaultValues={form.watch('location') ?? []}
            onChange={(vals) => form.setValue('location', vals)}
            label="Location"
            options={locations}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={form.watch('service') ?? []}
            onChange={(vals) => form.setValue('service', vals)}
            label="Service"
            options={serviceCodes}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={form.watch('state') ?? []}
            onChange={(vals) => form.setValue('state', vals)}
            label="State"
            options={states}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={form.watch('practice') ?? []}
            onChange={(vals) => form.setValue('practice', vals)}
            label="Practice"
            options={practices}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <MultiSelectField
            defaultValues={form.watch('organization') ?? []}
            onChange={(vals) => form.setValue('organization', vals)}
            label="Organization"
            options={organizations}
            disabled={loading}
          />
        </Box>
        <Box className="col-span-2">
          <StatusSelect disabled={loading} />
        </Box>

        <Box className="col-span-2">
          <Flex className=" h-full items-end justify-end" gap="1">
            <ClearButton patientId={patientId} disabled={loading} />
            <Button highContrast size="1" type="submit" disabled={loading}>
              <MagnifyingGlassIcon strokeWidth={2} />
            </Button>
          </Flex>
        </Box>
      </Grid>
    </FormContainer>
  )
}

export { LeftPanelFilters, type NotesFilterSchemaType }
