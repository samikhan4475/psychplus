'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FormContainer } from '@/components'
import { SelectOptionType } from '@/types'
import { attachPracticeWithLocationAction } from '../../actions'
import { AsyncSearchLocationPracticeSelect } from '../../async-search-practice'
import { useStore } from '../store'
import { LocationFormSchema, LocationFormSchemaType } from './schema'

interface FilterFormProps {
  practiceType: string
}

const FilterForm = ({ practiceType }: FilterFormProps) => {
  const { id: locationId } = useParams<{ id: string }>()
  const { fetchLocations, loading } = useStore((state) => ({
    error: state.error,
    fetchLocations: state.fetchLocations,
    loading: state.loading,
  }))

  const form = useForm<LocationFormSchemaType>({
    disabled: loading,
    resolver: zodResolver(LocationFormSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<LocationFormSchemaType> = () =>
    fetchLocations({ locationId, practiceType })

  const onOptionClicked = async (option: SelectOptionType) => {
    if (locationId) {
      const response = await attachPracticeWithLocationAction(
        {
          recordStatus: 'Active',
          practiceId: option.value,
          locationId,
          practiceType,
          isPrimaryPractice: false,
        },
        locationId,
        option.value,
      )

      if (response.state === 'error') {
        return toast.error(response.error)
      }

      fetchLocations({
        locationId,
        practiceType,
      })
      toast.success('The practice is successfully attached')
    }
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white flex flex-row flex-wrap items-start gap-2 rounded-1 p-2 shadow-2"
    >
      <Text size="3" weight="bold" className="pr-8">
        {practiceType} Practice
      </Text>

      <Text className="pt-1 !text-1">Search & Add Practice</Text>
      <AsyncSearchLocationPracticeSelect onOptionClicked={onOptionClicked} />
    </FormContainer>
  )
}

export { FilterForm }
