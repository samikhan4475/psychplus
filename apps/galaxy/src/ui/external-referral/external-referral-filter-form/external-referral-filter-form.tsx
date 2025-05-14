'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid } from '@radix-ui/themes'
import {
  SubmitErrorHandler,
  useForm,
  type SubmitHandler,
} from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { useStore } from '../store'
import { convertDateField, getInitialValues, hasFieldErrors } from '../utils'
import { Filters } from './filters'
import { ExternalReferralSchemaType, patientLookupSchema } from './schema'

const ExternalReferralFilterForm = () => {
  const { error, search, formValues, loading, showFilters, toggleFilters } =
    useStore(
      useShallow((state) => ({
        error: state.error,
        search: state.search,
        formValues: state.formValues,
        loading: state.loading,
        showFilters: state.showFilters,
        toggleFilters: state.toggleFilters,
      })),
    )

  const form = useForm<ExternalReferralSchemaType>({
    disabled: loading,
    resolver: zodResolver(patientLookupSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
    values: {
      ...(formValues || {}),
      patientDateOfBirth: convertDateField(formValues?.patientDateOfBirth),
      patientCreatedFrom: convertDateField(formValues?.patientCreatedFrom),
      patientCreatedTo: convertDateField(formValues?.patientCreatedTo),
    },
  })

  const onSubmit: SubmitHandler<ExternalReferralSchemaType> = (data) => {
    return search(data, 1, true)
  }
  const onError: SubmitErrorHandler<ExternalReferralSchemaType> = (errors) => {
    if (!showFilters && hasFieldErrors(errors)) {
      toggleFilters()
    }
  }

  const handleResetForm = () => {
    search(getInitialValues(), 1, true)
    form.reset({ ...getInitialValues() })
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
              <Button
                size="1"
                variant="ghost"
                type="button"
                className="text-pp-text-primary-base"
                onClick={toggleFilters}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button
                size="1"
                variant="outline"
                color="gray"
                type="button"
                className="text-black disabled:text-gray-5"
                onClick={handleResetForm}
              >
                Clear
              </Button>
              <Button size="1" variant="solid" type="submit" highContrast>
                <MagnifyingGlassIcon strokeWidth={2} />
              </Button>
            </Flex>
          </Grid>
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { ExternalReferralFilterForm }
