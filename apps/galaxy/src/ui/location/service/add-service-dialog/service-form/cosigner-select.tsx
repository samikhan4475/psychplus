'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { StaffResource } from '@/types'
import { useStore } from '../../store'
import { transformInCosigers } from '../../transform'
import { CosignerType } from '../../types'
import { ServiceSchemaType } from './schema'

interface CosignerSelectProps {
  options: StaffResource[]
}
const CosignerSelect = ({ options }: CosignerSelectProps) => {
  const form = useFormContext<ServiceSchemaType>()
  const cosignerType = form.watch('coSignerType')
  const locationId = form.watch('locationId')
  const { fetchCosigners, loading } = useStore((state) => ({
    fetchCosigners: state.fetchCosigners,
    loading: state.cosignersLoading,
  }))

  useEffect(() => {
    if (CosignerType.Location === cosignerType) {
      fetchCosigners()
    }
  }, [fetchCosigners, cosignerType])

  if (CosignerType.Location !== cosignerType || !locationId) return null

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Cosigner</FormFieldLabel>
      <SelectInput
        options={transformInCosigers(options)}
        loading={loading}
        size="1"
        field="cosigner"
        buttonClassName="w-full h-7"
      />
    </FormFieldContainer>
  )
}

export { CosignerSelect }
