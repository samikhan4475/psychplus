'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import {
  SubmitErrorHandler,
  useForm,
  type SubmitHandler,
} from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { getInitialValues, hasFieldErrors } from '../utils'
import { ClearButton } from './clear-button'
import { FilterButton } from './filter-button'
import { Filters } from './filters'
import { experienceSchema, ExperienceSchemaType } from './schema'
import { SubmitButton } from './submit-button'

const ExperienceFilterForm = () => {
  const store = useStore()
  const { error, loading, showFilters, toggleFilters, getExperiences, page } =
    zustandUseStore(store, (state) => ({
      getExperiences: state.getExperiences,
      error: state.error,
      loading: state.loading,
      showFilters: state.showFilters,
      toggleFilters: state.toggleFilters,
      page: state.page,
    }))

  const form = useForm<ExperienceSchemaType>({
    disabled: loading,
    resolver: zodResolver(experienceSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const onSubmit: SubmitHandler<ExperienceSchemaType> = (data) => {
    const payload = sanitizeFormData({
      ...data,
      dateOfBirth: data.dateOfBirth?.toString(),
      fromDateTime: formatDateToISOString(data.fromDateTime) ?? '',
      toDateTime: formatDateToISOString(data.toDateTime, true) ?? '',
    })

    return getExperiences(payload, page, true)
  }

  const onError: SubmitErrorHandler<ExperienceSchemaType> = (errors) => {
    if (!showFilters && hasFieldErrors(errors)) {
      toggleFilters()
    }
  }

  return (
    <Flex direction="column" gap="1" className="bg-white" py="3" px="4">
      <FormError message={error} />
      <Flex gap="4">
        <FormContainer form={form} onSubmit={onSubmit} onError={onError}>
          <Grid columns="4" gap="2" align="baseline">
            {showFilters && <Filters />}

            <Flex
              className="col-span-full"
              justify="end"
              gap="2"
              align="center"
            >
              <FilterButton />
              <ClearButton />
              <SubmitButton />
            </Flex>
          </Grid>
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { ExperienceFilterForm }
