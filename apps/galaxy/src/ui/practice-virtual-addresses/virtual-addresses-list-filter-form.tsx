'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { AddressGroup } from './address-group-field'
import { ClearButton } from './clear-button'
import { NPIField } from './npi-field'
import { ProviderSelect } from './provider-select'

const schema = z.object({
  practiceName: z.string().optional(),
  npi: z.string().optional(),
  tin: z.string().optional(),
  taxonomyCode: z.string().optional(),
  clia: z.string().optional(),
  organization: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  provider: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  payAddress: z.string().optional(),
  status: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const VirtualAddressesListFilterForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      practiceName: '',
      npi: '',
      tin: '',
      taxonomyCode: '',
      clia: '',
      organization: '',
      phone: '',
      fax: '',
      address1: '',
      address2: '',
      city: '',
      provider: '',
      state: '',
      zip: '',
      payAddress: '',
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {}

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <AddressGroup />
      <ProviderSelect />
      <NPIField />
      <ClearButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { VirtualAddressesListFilterForm, type SchemaType }
