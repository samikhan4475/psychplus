'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { addCodeset } from '@/ui/assigning-authorities/actions'
import {
  aaDisplayNameValidation,
  namespaceValidation,
  oidValidation,
} from '@/ui/assigning-authorities/form-validations'
import { useStore } from '@/ui/assigning-authorities/store'
import { Codeset } from '@/ui/assigning-authorities/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import {
  DeactivateDatePicker,
  DescriptionInput,
  EffectiveDatePicker,
  NameInput,
  OidInput,
  SourceFormatInput,
  SourceNameInput,
  SourceUrlInput,
  VersionInput,
} from './form-fields'
import { SourceUpdateDays } from './form-fields/source-update-days-input'

const schema = z.object({
  name: namespaceValidation,
  oid: oidValidation,
  description: aaDisplayNameValidation,
  version: z.string(),
  sourceUrl: z.string().max(1024, 'Max 1024 characters are allowed').optional(),
  sourceFormat: z.string().optional(),
  sourceName: z.string().max(128, 'Max 128 characters are allowed').optional(),
  sourceUpdateDays: z.string(),
  effectiveDate: z.custom<DateValue | null>(),
  deactivateDate: z.custom<DateValue | null>(),
})

type SchemaType = z.infer<typeof schema>

interface AddCodesetFormProps {
  onClose: () => void
  activeCodesets?: Codeset[]
  setActiveCodesets: (activeCodesets: Codeset[]) => void
}

const AddCodesetForm = ({
  onClose,
  activeCodesets,
  setActiveCodesets,
}: AddCodesetFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })
  const { selectedAssigningAuthority, setSelectedCodeset } = useStore()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!selectedAssigningAuthority) return

    const response = await addCodeset(
      sanitizeFormData({
        assigningAuthorityId: selectedAssigningAuthority?.id,
        codeSystemName: data.name,
        displayName: data.description,
        version: data.version,
        oid: data.oid ?? '',
        validFrom: formatDateToISOString(data?.effectiveDate) ?? '',
        validTo: formatDateToISOString(data?.deactivateDate) ?? '',
        sourceName: data.sourceName ?? '',
        sourceUrl: data.sourceUrl ?? '',
        sourceFormat: data.sourceFormat ?? '',
        sourceUpdateDays: Number(data.sourceUpdateDays),
      }),
    )
    setLoading(false)

    if (response.state === 'error') {
      return toast.error(
        response.error ?? 'Error while saving new assigning authority',
      )
    }
    setActiveCodesets([response.data, ...(activeCodesets ?? [])])

    setSelectedCodeset(response.data)

    toast.success('Saved')
    onClose()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-3">
      <Grid columns="2" gap="2">
        <NameInput disabled={loading} />
        <DescriptionInput disabled={loading} />
      </Grid>

      <Grid columns="2" gap="2">
        <OidInput disabled={loading} />
        <VersionInput disabled={loading} />
      </Grid>

      <Grid columns="2" gap="2">
        <SourceNameInput disabled={loading} />
        <SourceUrlInput disabled={loading} />
      </Grid>

      <Grid columns="2" gap="2">
        <SourceFormatInput disabled={loading} />
        <SourceUpdateDays disabled={loading} />
      </Grid>

      <Grid columns="2" gap="2">
        <EffectiveDatePicker disabled={loading} />
        <DeactivateDatePicker disabled={loading} />
      </Grid>

      <Flex justify="end">
        <Button highContrast size="2" type="submit" disabled={loading}>
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { AddCodesetForm, type SchemaType }
