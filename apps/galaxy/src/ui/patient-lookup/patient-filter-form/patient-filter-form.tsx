'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import {
  SubmitErrorHandler,
  useForm,
  type SubmitHandler,
} from 'react-hook-form'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { useStore } from '../store'
import { convertDateField, getInitialValues, hasFieldErrors } from '../utils'
import { ClearButton } from './clear-button'
import { FilterButton } from './filter-button'
import { Filters } from './filters'
import { patientLookupSchema, PatientLookUpSchemaType } from './schema'
import { SubmitButton } from './submit-button'

const PatientFilterForm = () => {
  const { error, search, formValues, loading, showFilters, toggleFilters } =
    useStore((state) => ({
      error: state.error,
      search: state.search,
      formValues: state.formValues,
      loading: state.loading,
      showFilters: state.showFilters,
      toggleFilters: state.toggleFilters,
    }))

  const form = useForm<PatientLookUpSchemaType>({
    disabled: loading,
    resolver: zodResolver(patientLookupSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
    values: {
      ...(formValues || {}),
      patientCreatedFrom: convertDateField(formValues?.patientCreatedFrom),
      dateOfBirth: convertDateField(formValues?.patientCreatedFrom),
      patientCreatedTo: convertDateField(formValues?.patientCreatedFrom),
    },
  })

  const onSubmit: SubmitHandler<PatientLookUpSchemaType> = (data) => {
    return search(data, 1, true)
  }

  const onError: SubmitErrorHandler<PatientLookUpSchemaType> = (errors) => {
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

export { PatientFilterForm }
