'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { ClearingHouseSubmitter } from '../types'
import { ContactPersonField } from './contact-person-field'
import { EmailField } from './email-field'
import { FaxField } from './fax-field'
import { NameField } from './name-field'
import { PhoneField } from './phone-field'
import { ResetButton } from './reset-button'
import { useStore } from './store'
import { SubmitterIdField } from './submitter-id-field'
import { UserNameField } from './user-name-field'

const schema = z.object({
  name: z.string().optional(),
  username: z.string().trim().optional(),
  email: z.string().optional(),
  submitterId: z.string().trim().optional(),
  address1: z.string().trim().optional(),
  address2: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  zip: z.string().trim().optional(),
  contactPerson: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  fax: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const SubmitterListFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      submitterId: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      contactPerson: '',
      phone: '',
      fax: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      addressLine1: data.address1,
      addressLine2: data.address2,
    }
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as Partial<ClearingHouseSubmitter>
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <NameField />
        <UserNameField />
        <EmailField />
        <SubmitterIdField />
        <AddressFieldsGroup
          className="flex-row"
          columnsPerRow="2"
          required={false}
          isFilter
          fieldContainerClassName="flex-row"
          stateFieldContainerClassName="w-[80%]"
        />
      </Grid>
      <Grid columns="12" gap="2" className="flex">
        <Flex className="col-span-7 gap-2">
          <ContactPersonField />

          <PhoneField />
          <FaxField />
          <ResetButton />
          <Button highContrast size="1" type="submit" className="w-10">
            <MagnifyingGlassIcon strokeWidth={2} />
          </Button>
        </Flex>
      </Grid>
    </FormContainer>
  )
}

export { SubmitterListFilterForm, type SchemaType }
