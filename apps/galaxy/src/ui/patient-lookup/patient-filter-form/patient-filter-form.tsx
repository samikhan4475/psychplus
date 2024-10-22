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
import { SelectOptionType } from '@/types'
import { ERROR_FIELDS } from '../constants'
import { useStore } from '../store'
import { convertDateField, getInitialValues, hasFieldErrors } from '../utils'
import { AgeInput } from './age-input'
import { ClearButton } from './clear-button'
import { CollapseButton } from './collapse-button'
import { DOBDatePicker } from './dob-date-picker'
import { FirstNameInput } from './first-name-input'
import { GenderSelect } from './gender-select'
import { LastNameInput } from './last-name-input'
import { MoreFilters } from './more-filters'
import { MRNInput } from './mrn-input'
import { patientLookupSchema, PatientLookUpSchemaType } from './schema'
import { SubmitButton } from './submit-button'

interface PatientFilterFormProps {
  practicesOptions: SelectOptionType[]
}

const PatientFilterForm = ({ practicesOptions }: PatientFilterFormProps) => {
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
    if (!showFilters && hasFieldErrors(ERROR_FIELDS, errors)) {
      toggleFilters()
    }
  }

  return (
    <Flex direction="column" gap="1" className="bg-white" py="3" px="4">
      <FormError message={error} />
      <Flex gap="4">
        <FormContainer form={form} onSubmit={onSubmit} onError={onError}>
          <Grid columns="4" gap="2" align="baseline">
            <FirstNameInput />
            <LastNameInput />
            <Grid columns="2" gap="2" align="baseline">
              <AgeInput />
              <GenderSelect />
            </Grid>
            <Grid columns="2" gap="2" align="baseline">
              <MRNInput />
              <DOBDatePicker />
            </Grid>
            {showFilters ? (
              <MoreFilters practicesOptions={practicesOptions} />
            ) : (
              <Flex className="col-span-full" justify="end" gap="2">
                <ClearButton />
                <SubmitButton />
              </Flex>
            )}
          </Grid>
        </FormContainer>
        <CollapseButton isOpen={showFilters} onOpenToggle={toggleFilters} />
      </Flex>
    </Flex>
  )
}

export { PatientFilterForm }
