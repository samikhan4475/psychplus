import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { usePatientId } from '@psychplus/patient'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { FormContainer, FormSubmitButton } from '@psychplus/ui/form'
import { isPrescriber, useStaff } from '@psychplus/user'
import { usePubsub } from '@psychplus/utils/event'
import { CREATE_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EVENT_REFERRAL_CREATED, EventType } from '@psychplus/widgets/events'
import { createReferral } from '../api.client'
import { DEFAULT_REFERRAL_SERVICE_STATUS } from '../constants'
import { useReferralExists } from '../hooks'
import { useStore } from '../store'
import { CommentsInput } from './comments-input'
import { ConfirmDialog } from './confirm-dialog'
import { ProviderSelector } from './provider-selector'
import { ServiceSelector } from './service-selector'
import { ServiceStatusSelector } from './service-status-selector'

const schema = z.object({
  patientId: z.number(),
  service: z.string(),
  servicesStatus: z.string(),
  comments: z.string(),
  referredByName: z.object({
    avatar: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    honors: z.string().optional(),
  }),
})

type SchemaType = z.infer<typeof schema>

const CreateReferralForm = () => {
  const { publish } = usePubsub()
  const staff = useStaff(useStore)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: usePatientId(useStore),
      servicesStatus: DEFAULT_REFERRAL_SERVICE_STATUS,
      comments: '',
      referredByName: isPrescriber(staff)
        ? {
            firstName: staff.legalName.firstName,
            lastName: staff.legalName.lastName,
            honors: staff.legalName.honors,
          }
        : undefined,
    },
  })

  const referralExists = useReferralExists(form.watch('service'))

  const [confirm, setConfirm] =
    useState<(confirm: boolean) => void | undefined>()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (referralExists) {
      const promise = new Promise<boolean>((resolve) => {
        setConfirm(() => resolve)
      })

      const confirmed = await promise
      setConfirm(undefined)

      if (!confirmed) {
        return
      }
    }

    createReferral(data)
      .then(() => {
        publish(`${CREATE_REFERRAL_WIDGET}:${EventType.Closed}`)
        publish(EVENT_REFERRAL_CREATED)
      })
      .catch((err) => alert(err.message))
  }

  return (
    <>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex gap="4">
          <Box className="flex-1">
            <ServiceSelector />
          </Box>
          <Box className="flex-1">
            <ServiceStatusSelector />
          </Box>
        </Flex>
        <ProviderSelector />
        <CommentsInput />
        <Flex gap="3" justify="end" mt="3">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <FormSubmitButton form={form}>Save</FormSubmitButton>
        </Flex>
      </FormContainer>
      <ConfirmDialog confirm={confirm} />
    </>
  )
}

export { CreateReferralForm, type SchemaType }
