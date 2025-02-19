'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { ActiveVisitDialog } from '@/ui/clinic-schedule/shared'
import { addVacationAction, editVacationAction } from '../../actions'
import {
  ActiveVisitsAlert,
  LongVacationAlert,
  NegativeVacationAlert,
} from '../../shared'
import { useStore } from '../../store'
import { transformOutVacation } from '../../transform'
import { VacationPayload, VacationTime } from '../../types'
import { getCalculatedDuration, getInitialValues } from '../../utils'
import { DurationInput } from './duration-input'
import { FromDatePicker } from './from-date-picker'
import { SaveButton } from './save-button'
import { schema, VacationSchemaType } from './schema'
import { StatusSelect } from './status-select'
import { ToDatePicker } from './to-date-picker'

interface VacationFormProps {
  staffId: string
  vacation?: VacationTime
  onClose?: () => void
}

const VacationForm = ({ staffId, onClose, vacation }: VacationFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [vacationData, setVacationData] = useState<VacationTime>()
  const [confirm, setConfirm] = useState<(confirm: boolean) => void>()
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  const form = useForm<VacationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: getInitialValues(vacation, Number(staffId)),
  })
  const handleVacation = async (payload: VacationPayload) => {
    const response = await (payload.id
      ? editVacationAction(payload.id, payload)
      : addVacationAction(payload))
    if (response.state === 'error') {
      return toast.error(response.error)
    }

    toast.success(
      `Vacation ${payload.id ? 'Updated' : 'Created'} successfully!`,
    )
    if (response?.data?.isActiveClinicVisitPresent) {
      setVacationData(response.data)
      return setIsOpen(true)
    }
    refetch()
    onClose?.()
  }
  const handleConfirmation = async (payload: VacationPayload) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      setConfirm(() => resolve)
    })
    setConfirm(undefined)
    if (!confirmed) {
      return
    }
    await handleVacation(payload)
  }
  const onSubmit: SubmitHandler<VacationSchemaType> = async (data) => {
    const calculatedDuration = getCalculatedDuration(
      data.startDateTime,
      data.endDateTime,
      data.fromTime,
      data.toTime,
    )
    const payload: VacationPayload = transformOutVacation(data)
    if (calculatedDuration?.isNagtive) {
      return setAlertOpen(true)
    } else if (calculatedDuration?.isLongVacation) {
      return await handleConfirmation(payload)
    }
    await handleVacation(payload)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-white gap-5">
      <Grid columns="4" gap="2" align="start">
        <FromDatePicker />
        <ToDatePicker />
        <DurationInput />
        <StatusSelect />
      </Grid>
      <Flex align="center" justify={vacation ? 'between' : 'end'}>
        {vacation && <ActiveVisitDialog filters={vacation} />}
        <SaveButton />
      </Flex>
      <LongVacationAlert confirm={confirm} />
      <ActiveVisitsAlert
        isOpen={isOpen}
        closeDialog={() => {
          setIsOpen(false)
          onClose?.()
          refetch()
        }}
        vacation={vacationData}
      />
      <NegativeVacationAlert
        alertOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </FormContainer>
  )
}

export { VacationForm }
