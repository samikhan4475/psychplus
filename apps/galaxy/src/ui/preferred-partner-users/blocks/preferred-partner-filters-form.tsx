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
import { usePreferredPartnerStore, type PreferredPartnerFilters } from '../store'
import { getInitialValues } from '../utils'
import { ClearButton } from './clear-button'
import { FilterButton } from './filter-button'
import { Filters } from './filters'
import {
  preferredPartnerFiltersSchema,
  PreferredPartnerFiltersSchemaType,
} from './schema'
import { SubmitButton } from './submit-button'

interface PreferredPartnerFiltersFormProps {
  ppid: string
  searchFunction?: (
    partnerId: string,
    formValues?: Partial<PreferredPartnerFilters>,
    page?: number,
    reset?: boolean,
  ) => Promise<void>
}

const PreferredPartnerFiltersForm = ({
  ppid,
  searchFunction,
}: PreferredPartnerFiltersFormProps) => {
  const { error, searchActiveUsers, loading, showFilters, toggleFilters } =
    usePreferredPartnerStore((state) => ({
      error: state.error,
      searchActiveUsers: state.searchActiveUsers,
      loading: state.loading,
      showFilters: state.showFilters,
      toggleFilters: state.toggleFilters,
    }))

  const searchFn = searchFunction || searchActiveUsers

  const form = useForm<PreferredPartnerFiltersSchemaType>({
    disabled: loading,
    resolver: zodResolver(preferredPartnerFiltersSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const onSubmit: SubmitHandler<PreferredPartnerFiltersSchemaType> = (data) => {
    return searchFn(ppid, data, 1, true)
  }
  const onError: SubmitErrorHandler<PreferredPartnerFiltersSchemaType> = (
    errors,
  ) => {
    if (!showFilters && Object.keys(errors).length > 0) {
      toggleFilters()
    }
  }

  return (
    <Flex 
      direction="column" 
      gap="1" 
      className="bg-white w-full" 
      py="3" 
      px="4"
    >
      <FormError message={error} />
      <Flex gap="4" className="w-full">
        <FormContainer form={form} onSubmit={onSubmit} onError={onError} className="w-full">
          <Grid 
            columns={{ initial: '1', sm: '2', md: '4' }} 
            gap="2" 
            align="baseline" 
            className="w-full"
          >
            {showFilters && <Filters form={form} />}

            <Flex
              className="col-span-full"
              justify="end"
              gap="2"
              align="center"
            >
              <FilterButton />
              <ClearButton 
                ppid={ppid} 
                form={form} 
                onClear={(ppid) => searchFn(ppid, getInitialValues(), 1, true)}
                initialValues={getInitialValues()}
              />
              <SubmitButton />
            </Flex>
          </Grid>
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { PreferredPartnerFiltersForm }
