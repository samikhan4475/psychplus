import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { ClearFilterButton } from './clear-filter-button'
import {
  EndDateInput,
  FirstResponderSelect,
  GenderSelect,
  LanguageSelect,
  LocationDropdown,
  ProviderDropdown,
  ProviderTypeDropdown,
  ServiceMultiSelect,
  StartDateInput,
  StateSelect,
} from './filter-fields'
import { HideFiltersButton } from './hide-filters-button'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  usState: z.string().optional(),
  location: z.string().optional(),
  service: z.string().optional(),
  provider: z.string().optional(),
  providerType: z.string().optional(),
  gender: z.string().optional(),
  language: z.string().optional(),
  firstResponder: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const SchedulerFilterGroup = () => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      usState: '',
      location: '',
      service: '',
      provider: '',
      providerType: '',
      gender: '',
      language: '',
      firstResponder: '',
    },
  })

  const onSubmit = () => {
    // TODO: Implement with API integrations
  }

  return (
    <Flex
      className="rounded-[4px] px-1.5 shadow-3"
      direction="column"
      mx="5"
      mt="1"
    >
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          direction="column"
          gap="1"
          py="1"
          className="bg-white sticky top-0"
        >
          <Flex gap="2">
            <StartDateInput />
            <EndDateInput />
            <StateSelect />
            <LocationDropdown />
            <ServiceMultiSelect />
            <ProviderDropdown />
            {isPartialFilterView && (
              <>
                <ClearFilterButton />
                <SearchButton />
                <ShowFiltersButton
                  onClick={() => setIsPartialFilterView(false)}
                />
              </>
            )}
          </Flex>
          {!isPartialFilterView && (
            <Flex gap="2" align="center">
              <ProviderTypeDropdown />
              <GenderSelect />
              <LanguageSelect />
              <FirstResponderSelect />
              <Flex className="flex-1" justify="end" gap="2" align="center">
                <HideFiltersButton
                  onClick={() => setIsPartialFilterView(true)}
                />
                <ClearFilterButton />
                <SearchButton />
              </Flex>
            </Flex>
          )}
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { SchedulerFilterGroup }
