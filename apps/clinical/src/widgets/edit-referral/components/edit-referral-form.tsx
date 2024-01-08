import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { FormContainer, FormSubmitButton } from '@psychplus/ui/form'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EVENT_REFERRAL_EDITED, EventType } from '@psychplus/widgets/events'
import { updateReferral } from '../api.client'
import type { Referral } from '../types'
import { CommentsInput } from './comments-input'
import { ContactStatusSelector } from './contact-status-selector'
import { ProviderSelector } from './provider-selector'
import { ReferralStatusSelector } from './referral-status-selector'
import { ServiceSelector } from './service-selector'
import { ServiceStatusSelector } from './service-status-selector'

type SchemaType = z.infer<typeof schema>

const schema = z.object({
  service: z.string(),
  servicesStatus: z.string(),
  comments: z.string(),
  contactStatus: z.string().optional(),
  resourceStatus: z.string(),
  referredByName: z
    .object({
      avatar: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      honors: z.string().optional(),
    })
    .optional(),
})

interface EditReferralFormProps {
  referral: Referral
}

const EditReferralForm = ({ referral }: EditReferralFormProps) => {
  const { publish } = usePubsub()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: referral.service,
      servicesStatus: referral.servicesStatus,
      contactStatus:
        referral.contactStatus === CODE_NOT_SET
          ? undefined
          : referral.contactStatus,
      resourceStatus: referral.resourceStatus,
      comments: referral.comments,
      referredByName: referral.referredByName,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    updateReferral({ ...referral, ...data })
      .then(() => {
        publish(EVENT_REFERRAL_EDITED)
        publish(`${EDIT_REFERRAL_WIDGET}:${EventType.Closed}`)
      })
      .catch((err) => alert(err.message))
  }

  return (
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
      <Flex gap="4">
        <Box className="flex-1">
          <ContactStatusSelector />
        </Box>
        <Box className="flex-1">
          <ReferralStatusSelector />
        </Box>
      </Flex>
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
  )
}

export { EditReferralForm, type SchemaType }
