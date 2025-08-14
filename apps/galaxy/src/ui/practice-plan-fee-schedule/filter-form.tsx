'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { ClearButton } from './clear-button'
import { CptCodeField } from './cpt-code-field'
import { DescriptionSelect } from './descripton-select'
import { MastersField } from './masters-field'
import { MdDoField } from './md-do-field'
import { NpField } from './np-field'
import { PaField } from './pa-field'
import { PsydField } from './psyd-field'
import { useStore } from './store'
import { StaffSearchParams } from './types'

const schema = z.object({
  partialDisplayName: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      partialDisplayName: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
    }
    const cleanedData = sanitizeFormData(formattedData) as StaffSearchParams
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-2 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <CptCodeField />
        <DescriptionSelect />
        <MdDoField />
        <NpField />
        <PaField />
        <PsydField />
        <MastersField />
        <ClearButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Grid>
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
