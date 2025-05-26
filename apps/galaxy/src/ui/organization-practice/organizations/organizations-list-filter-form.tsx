'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { OrganizationsSearchParams } from '../types'
import { ContactNameField } from './contact-name-field'
import { EmailField } from './email-field'
import { NameField } from './name-field'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { Statuselect } from './status-select'
import { useStore } from './store'

const schema = z.object({
  name: z.string().optional(),
  practiceId: z.string().optional(),
  partialContactName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z
    .string()
    .max(5, { message: 'Zip should be 5 digits' })
    .nullable()
    .optional(),
  status: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationsListFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      practiceId: '',
      partialContactName: '',
      phoneNumber: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      status: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      name: '',
      practiceId: '',
      partialContactName: '',
      phoneNumber: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      status: '',
    })
    return search()
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      partialShortName: data.name,
      partialAddress1: data.address1,
      partialAddress2: data.address2,
      stateCode: data.state,
      recordStatuses: data.status ? [data.status] : undefined,
    }
    const cleanedData = sanitizeFormData(
      formattedData,
    ) as OrganizationsSearchParams
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <Flex className="col-span-12">
          <NameField />
          <PracticeSelect />
          <ContactNameField />
          <PhoneField />
          <EmailField />
        </Flex>
      </Grid>

      <Grid columns="12" gap="2" className="flex">
        <AddressFieldsGroup
          className="flex-row"
          columnsPerRow="2"
          required={false}
          isFilter
          fieldContainerClassName="flex-row"
          stateFieldContainerClassName="w-[80%]"
          fieldLabelClassName="!text-1"
          addAreaCode={false}
        />
        <Statuselect />
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={onClear}
        >
          Clear
        </Button>
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Grid>
    </FormContainer>
  )
}

export { OrganizationsListFilterForm, type SchemaType }
