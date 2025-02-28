import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate } from '@internationalized/date'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { DatePickerInput, FormContainer, MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions, useHasPermission } from '@/hooks'
import { ActionResult, SelectOptionType } from '@/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import '../patient-lookup/actions'
import {
  getClinicsOptionsAction,
  getProvidersOptionsAction,
  getUsStatesOptionsAction,
} from '../schedule/client-actions'
import { getVisitTypesAction } from '../scheduling-history/client-actions/get-visit-types'
import { ClearButton } from './clear-button'
import { getOrganizationOptionsAction } from './client-actions/get-organization-options'
import { getPracticesOptionsAction } from './client-actions/get-practices-options'
import { NoteTypeDropdown } from './note-detail-note-type-dropdown'
import { PatientNameInput } from './patient-name-input'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { Tabs } from './types'
import { removeEmptyValues } from './utils'

const emptyOrStringArray = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const schema = z.object({
  dateFrom: z.custom<DateValue>(),
  dateTo: z.custom<DateValue>(),
  patientName: z.string().optional().default(''),
  author: emptyOrStringArray,
  visitType: emptyOrStringArray,
  visitTitle: emptyOrStringArray,
  location: emptyOrStringArray,
  service: emptyOrStringArray,
  state: emptyOrStringArray,
  practice: emptyOrStringArray,
  organization: emptyOrStringArray,
  noteType: z.string().optional().default(''),
  status: z.string().optional().default(''),
})

type NotesFilterSchemaType = z.infer<typeof schema>

const today = new Date()
const threeeMonthsAgo = new Date()
threeeMonthsAgo.setMonth(today.getMonth() - 3)

const LeftPanelFilters = ({ patientId }: { patientId?: string }) => {
  const search90DaysOldNotesPermission = useHasPermission(
    'search90DaysOldNotes',
  )

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
      noteType: '',
      status: '',
      patientName: '',
    },
  })

  const {
    fetch,
    fetchStaffNotes,
    loading,
    setSelectedRow,
    setIsErrorAlertOpen,
    setErrorMessage,
    isInboxNotes,
    tab,
    setSelectedRows,
  } = useStore((state) => ({
    fetch: state.fetch,
    fetchStaffNotes: state.fetchStaffNotes,
    loading: state.loading,
    setSelectedRow: state.setSelectedRow,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setErrorMessage: state.setErrorMessage,
    isInboxNotes: state.isInboxNotes,
    tab: state.tab,
    setSelectedRows: state.setSelectedRows,
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
      locationServicesOffered: data.service,
      stateIds: data.state,
      practiceIds: data.practice,
      organizationIds: data.organization,
      status: [data.status],
      noteTypeCode: data.noteType,
      patientName: data.patientName,
    }
    const now = new Date()
    const dateFrom = new Date(payload.dateFrom)
    const dateTo = new Date(payload.dateTo)

    const ninetyDaysAgo = new Date()

    ninetyDaysAgo.setDate(now.getDate() - 90)
    if (
      (data.dateFrom &&
        dateFrom < ninetyDaysAgo &&
        !search90DaysOldNotesPermission) ||
      (data.dateTo && dateTo < ninetyDaysAgo && !search90DaysOldNotesPermission)
    ) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Search 90 Days Old Notes. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    if (patientId && !isInboxNotes) {
      fetch(removeEmptyValues(sanitizeFormData(payload)))
    } else if (isInboxNotes) {
      const statuses =
        tab === Tabs.PENDING_NOTES ? ['pending'] : ['SignedPending']
      fetchStaffNotes(
        removeEmptyValues(sanitizeFormData({ ...payload, status: statuses })),
      )
    }

    setSelectedRow(undefined)
    setSelectedRows([])
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
    action: () => Promise<ActionResult<SelectOptionType[]>>,
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
        {isInboxNotes && (
          <Box className="col-span-2">
            <PatientNameInput isDisabled={loading} />
          </Box>
        )}
        {!isInboxNotes && (
          <Box className="col-span-3">
            <NoteTypeDropdown disabled={loading} />
          </Box>
        )}
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
        {!isInboxNotes && (
          <Box className="col-span-2">
            <MultiSelectField
              defaultValues={form.watch('practice') ?? []}
              onChange={(vals) => form.setValue('practice', vals)}
              label="Practice"
              options={practices}
              disabled={loading}
            />
          </Box>
        )}
        {!isInboxNotes && (
          <Box className="col-span-2">
            <MultiSelectField
              defaultValues={form.watch('organization') ?? []}
              onChange={(vals) => form.setValue('organization', vals)}
              label="Organization"
              options={organizations}
              disabled={loading}
            />
          </Box>
        )}
        {!isInboxNotes && (
          <Box className="col-span-2">
            <StatusSelect disabled={loading} isInboxNotes={isInboxNotes} />
          </Box>
        )}

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
