import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { ActiveVisits } from '../../active-visits'
import { addVacation } from '../actions/add-vacation'
import { schema, SchemaType } from '../schema'
import { ActiveVisitsAlert } from './active-visits-alert'
import { DurationText } from './duration-text'
import { FromDateInput } from './from-date-input'
import { LongVacationAlert } from './long-vacation-alert'
import { StatusSelect } from './status-select'
import { TimeInput } from './time-input'
import { ToDateInput } from './to-date-input'

const AddVacationForm = ({
  staffId,
  setIsOpenDialog,
}: {
  staffId: string
  setIsOpenDialog: (isOpen: boolean) => void
}) => {
  const [isLongVacationAlertOpen, setIsLongVacationAlertOpen] =
    useState<boolean>(false)
  const [isActiveVisitsAlertOpen, setIsActiveVisitsAlertOpen] =
    useState<boolean>(false)
  const [isActiveVisitsOpen, setIsActiveVisitsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: undefined,
      fromTime: undefined,
      toDate: undefined,
      toTime: undefined,
      duration: 0,
      vacationStatus: 'Pending',
    },
  })
  const startDate = `${form.getValues('fromDate')}T${form.getValues(
    'fromTime',
  )}:00`
  const endDate = `${form.getValues('toDate')}T${form.getValues('toTime')}:00`

  const createVacation = async (data: SchemaType) => {
    setIsLongVacationAlertOpen(false)
    setIsLoading(true)
    const body = {
      recordStatus: 'Active',
      staffId: Number(staffId),
      startDate: data.fromDate?.toString(),
      endDate: data.toDate?.toString(),
      startTime: `${data.fromTime}:00`,
      endTime: `${data.toTime}:00`,
      duration: data.duration.toString(),
      vacationStatus: data.vacationStatus,
    }

    const result = await addVacation({ staffId, body })
    setIsLoading(false)

    if (result.state === 'error') {
      if (result.error.includes('active vacation time')) {
        return setIsActiveVisitsAlertOpen(true)
      }
      setIsActiveVisitsAlertOpen(true)
      return toast.error(result.error)
    }

    toast.success('Vacations added successfully!')
    setIsOpenDialog(false)
    form.reset()
  }

  const onSubmit = (data: SchemaType) => {
    if (data.duration > 14) {
      return setIsLongVacationAlertOpen(true)
    }
    createVacation(data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <LongVacationAlert
        isOpen={isLongVacationAlertOpen}
        closeDialog={() => setIsLongVacationAlertOpen(false)}
        onConfirm={createVacation}
      />
      <ActiveVisitsAlert
        isOpen={isActiveVisitsAlertOpen}
        closeDialog={() => setIsActiveVisitsAlertOpen(false)}
        onConfirm={() => {
          setIsActiveVisitsAlertOpen(false)
          setIsActiveVisitsOpen(true)
        }}
      />
      <ActiveVisits
        staffId={staffId}
        startDate={startDate}
        endDate={endDate}
        isOpen={isActiveVisitsOpen}
        closeDialog={() => setIsActiveVisitsOpen(false)}
      />
      <Grid
        columns="12"
        rows="2"
        className="min-w-[648px] gap-3"
        id="add-vacation-form"
      >
        <Box className="col-span-3">
          <FromDateInput label="From Date & Time" field="fromDate" />
        </Box>
        <Box className="transparent-label col-span-3">
          <TimeInput field="fromTime" label="From Time" />
        </Box>
        <Box className="col-span-3">
          <ToDateInput label="To Date & Time" field="toDate" />
        </Box>
        <Box className="transparent-label col-span-3">
          <TimeInput field="toTime" label="To Time" />
        </Box>
        <Box className="col-span-3">
          <DurationText />
        </Box>
        <Box className="col-span-3">
          <StatusSelect />
        </Box>
      </Grid>
      <Flex justify="end" mt="3">
        <Button
          loading={isLoading}
          className={`bg-pp-black-1 text-white cursor-pointer`}
          onClick={form.handleSubmit(onSubmit, () => form.trigger())}
        >
          <Text size="2">Save</Text>
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { AddVacationForm }
