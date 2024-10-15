'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { AddVisit } from './add-visit'
import { CalenderView } from './calender-view'
import {
  ClearAction,
  LocationDropdown,
  ProviderDropdown,
} from './filter-fields'
import { NextDropdown } from './filter-fields/next-dropdown'
import { useStore } from './store'
import { getEndDate, removeEmptyValues } from './utils'

const schema = z.object({
  next: z.string(),
  location: z.string().optional(),
  provider: z.string().optional(),
})

export type SchemaType = z.infer<typeof schema>

const FollowUpFilterForm = ({ patientId }: { patientId: string }) => {
  const { search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      next: '4week',
      location: '',
      provider: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      next: '4week',
      location: '',
      provider: '',
    })

    return search({
      startingDate: new Date().toDateString(),
      endingDate: getEndDate('4week').toDateString(),
    })
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const payload = {
      locationId: data.location,
      providerIds: [data.provider],
      startingDate: new Date().toDateString(),
      endingDate: getEndDate(data.next).toDateString(),
    }

    const cleanedData = removeEmptyValues(payload)

    return search(cleanedData)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className="mt-2" align="center" gap="2">
        <NextDropdown />
        <LocationDropdown />
        <ProviderDropdown />
        <ClearAction onClear={onClear} />

        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
        <AddVisit />
        <CalenderView />
      </Flex>
    </FormContainer>
  )
}

export { FollowUpFilterForm }
