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
import { usePreferredPartnerStore } from '../store'
import { getInitialValues } from '../utils'
import { ClearButton } from './clear-button'
import { FilterButton } from './filter-button'
import { Filters } from './filters'
import {
  preferredPartnerFiltersSchema,
  PreferredPartnerFiltersSchemaType,
} from './schema'
import { SubmitButton } from './submit-button'

interface PreferredPartnerWorklistFiltersFormProps {
  ppid: string
}

const PreferredPartnerWorklistFiltersForm = ({
  ppid,
}: PreferredPartnerWorklistFiltersFormProps) => {
  const { error, searchWorklist, worklistLoading, showFilters, toggleFilters } =
    usePreferredPartnerStore((state) => ({
      error: state.worklistError,
      searchWorklist: state.searchWorklist,
      worklistLoading: state.worklistLoading,
      showFilters: state.showFilters,
      toggleFilters: state.toggleFilters,
    }))

  const form = useForm<PreferredPartnerFiltersSchemaType>({
    disabled: worklistLoading,
    resolver: zodResolver(preferredPartnerFiltersSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const onSubmit: SubmitHandler<PreferredPartnerFiltersSchemaType> = (data) => {
    return searchWorklist(ppid, data, 1, true)
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
            {showFilters && (
              <>
                <Filters form={form} />
              </>
            )}

            <Flex
              className="col-span-full"
              justify="end"
              gap="2"
              align="center"
            >
              <FilterButton />
              <ClearButton ppid={ppid} form={form} />
              <SubmitButton />
            </Flex>
          </Grid>
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { PreferredPartnerWorklistFiltersForm }
