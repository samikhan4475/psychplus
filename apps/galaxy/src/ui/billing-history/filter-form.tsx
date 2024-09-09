'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { BillingStatusSelect } from './billing-status-select'
import { CosignerSelect } from './cosigner-select'
import { DateInputFrom } from './date-input-from'
import { DateInputTo } from './date-input-to'
import { LocationsSelect } from './locations-select'
import { ProvidersSelect } from './providers-select'
import { SchedulingStatusSelect } from './scheduling-status-select'
import { SignedSelect } from './signed-select'
import { SpecialtySelect } from './specialty-select'
import { useStore } from './store'
import { VerifiedSelect } from './verified-select'
import { VisitTypeSelect } from './visit-type-select'

const schema = z.object({
  dateFrom: z.custom<DateValue | null>(),
  dateTo: z.custom<DateValue | null>(),
  specialty: z.string().optional(),
  location: z.string().optional(),
  provider: z.string().optional(),
  coSigner: z.string().optional(),
  visitType: z.string().optional(),
  billingStatus: z.string().optional(),
  schedulingStatus: z.string().optional(),
  verified: z.string().optional(),
  signed: z.string().optional(),
})
type BillingFilterSchemaType = z.infer<typeof schema>

const BillingFilterForm = () => {
  const { toggleFilters, fetchProviders, providers } = useStore((state) => ({
    toggleFilters: state.toggleFilters,
    fetchProviders: state.fetchProviders,
    providers: state.providers,
  }))

  useEffect(() => {
    fetchProviders()
  }, [])

  const form = useForm<BillingFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      specialty: '',
      location: '',
      provider: '',
      coSigner: '',
      visitType: '',
      billingStatus: '',
      schedulingStatus: '',
      verified: '',
      signed: '',
    },
  })

  const onSubmit: SubmitHandler<BillingFilterSchemaType> = (data) => {
    console.log('Todo Api Request', data)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white z-[1] rounded-bl-1 rounded-br-1 p-2"
    >
      <Flex align="center" gap="2" wrap="wrap" width="100%">
        <DateInputFrom />
        <DateInputTo />
        <SpecialtySelect />
        <LocationsSelect />
        <ProvidersSelect providerOptions={providers ?? []} />
        <CosignerSelect providerOptions={providers ?? []} />
        <VisitTypeSelect />
        <BillingStatusSelect />
        <SchedulingStatusSelect />
        <VerifiedSelect />
        <SignedSelect />

        <Flex align="center" className="px-2">
          <Button
            size="1"
            variant="ghost"
            className="text-1 font-regular text-indigo-12"
            color="indigo"
            onClick={() => toggleFilters()}
          >
            Hide Filters
          </Button>
        </Flex>
        <Button
          size="1"
          color="gray"
          className="text-black"
          variant="outline"
          onClick={() => form.reset()}
        >
          Clear
        </Button>
        <Button type="submit" size="1" highContrast>
          <MagnifyingGlassIcon width="14px" height="14px" />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { BillingFilterForm, type BillingFilterSchemaType }
