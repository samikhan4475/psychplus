'use client'

import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { ClearingHouseReceiver } from '@/types'
import { sanitizeFormData } from '@/utils'
import { EmailField } from './email-field'
import { FaxField } from './fax-field'
import { NameField } from './name-field'
import { PhoneField } from './phone-field'
import { ReceiverIdField } from './receiver-id-field'
import { ReceiverNameField } from './receiver-name-field'
import { ResetButton } from './reset-button'
import { useStore } from './store'
import { SubmitButton } from './submit-button'

const schema = z.object({
  address1: z.string().optional(),
  address2: z.string().trim().optional(),
  state: z.string().optional(),
  city: z.string().trim().optional(),
  zip: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  fax: z.string().trim().optional(),
  email: z.string().trim().optional(),
  receiverId: z.string().trim().optional(),
  receiverName: z.string().trim().optional(),
  clearingHouseName: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const ReceiverListFilterForm = () => {
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      address1: '',
      address2: '',
      state: '',
      city: '',
      zip: '',
      phone: '',
      fax: '',
      email: '',
      receiverId: '',
      receiverName: '',
      clearingHouseName: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      practiceId: practiceId ?? '',
    }
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as Partial<ClearingHouseReceiver>
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <Flex className="col-span-1">
          <NameField />
        </Flex>
        <Flex className="col-span-11">
          <AddressFieldsGroup
            className="flex-row"
            columnsPerRow="2"
            required={false}
            isFilter
            fieldContainerClassName="flex-row"
            stateFieldContainerClassName="w-[80%]"
            addAreaCode={false}
          />
        </Flex>
      </Grid>
      <Grid columns="8" gap="2" className="flex">
        <PhoneField />
        <FaxField />
        <EmailField />
        <ReceiverIdField />
        <ReceiverNameField />
        <ResetButton />
        <SubmitButton />
      </Grid>
    </FormContainer>
  )
}

export { ReceiverListFilterForm, type SchemaType }
