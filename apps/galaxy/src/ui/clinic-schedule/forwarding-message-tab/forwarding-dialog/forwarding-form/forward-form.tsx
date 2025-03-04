'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import {
  addForwardingMessageAction,
  updateForwardingMessageAction,
} from '../../actions'
import { FORWARDING_FORM_ERROR } from '../../constant'
import { ActiveAlerts } from '../../shared'
import { useStore } from '../../store'
import { transformOutForwarding } from '../../transform'
import { ForwardingMessage } from '../../types'
import { getInitialValues } from '../../utils'
import { DurationInput } from './duration-input'
import { ForwardToSelect } from './forward-to-select'
import { FromDatePicker } from './from-date-picker'
import { SaveButton } from './save-button'
import { forwardingSchema, ForwardingSchemaType } from './schema'
import { ToDatePicker } from './to-date-picker'

interface ForwardingFormProps {
  userId: number
  forwardingMessage?: ForwardingMessage
  onClose?: () => void
}
const ForwardingForm = ({
  userId,
  forwardingMessage,
  onClose,
}: ForwardingFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setData, forwardingsData } = useStore((state) => ({
    setData: state.setData,
    forwardingsData: state.data,
  }))
  const form = useForm<ForwardingSchemaType>({
    resolver: zodResolver(forwardingSchema),
    defaultValues: getInitialValues(forwardingMessage, userId),
  })

  const updateForwardingsData = (forwarding: ForwardingMessage) => {
    const updatedForwardings = [...forwardingsData]
    const existingIndex = updatedForwardings.findIndex(
      (item) => item.id === forwardingMessage?.id,
    )
    if (existingIndex === -1) {
      updatedForwardings.unshift(forwarding)
    } else {
      updatedForwardings[existingIndex] = forwarding
    }
    setData(updatedForwardings)
  }

  const onSubmit: SubmitHandler<ForwardingSchemaType> = async (data) => {
    const payload = transformOutForwarding(data, forwardingMessage)
    const response = await (forwardingMessage
      ? updateForwardingMessageAction(
          forwardingMessage?.userId,
          forwardingMessage?.id,
          payload,
        )
      : addForwardingMessageAction(userId, payload))
    if (response.state === 'error') {
      if (response.error?.includes('message forwarding overlaps')) {
        return setIsOpen(true)
      } else {
        return toast.error(response.error)
      }
    }
    updateForwardingsData(response.data)
    onClose?.()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="5" gap="2">
        <ForwardToSelect />
        <FromDatePicker />
        <ToDatePicker />
        <DurationInput />
        <SaveButton />
      </Grid>
      <ActiveAlerts
        isOpen={isOpen}
        closeDialog={() => setIsOpen(false)}
        mesage={FORWARDING_FORM_ERROR}
      />
    </FormContainer>
  )
}

export { ForwardingForm }
