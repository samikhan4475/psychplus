import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { ClearFilterButton } from './clear-filter-button'
import { FirstResponderSelect } from './first-responder-select'
import { GenderSelect } from './gender-select'
import { HideFiltersButton } from './hide-filters-button'
import { LanguageSelect } from './language-select'
import { LocationDropdown } from './location-dropdown'
import { ProviderDropdown } from './provider-dropdown'
import { ProviderTypeDropdown } from './provider-type-dropdown'
import { SearchButton } from './search-button'
import { ServiceDropdown } from './service-dropdown'
import { ShowFiltersButton } from './show-filters-button'
import { StartDateInput } from './start-date-input'
import { StateSelect } from './state-select'
import { TimeOfTheDayDropdown } from './time-of-the-day-dropdown'
import { VisitMediumDropdown } from './visit-medium-dropdown'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  usState: z.string().optional(),
  location: z.string().optional(),
  service: z.string().optional(),
  provider: z.string().optional(),
  visitMedium: z.string().optional(),
  providerType: z.string().optional(),
  gender: z.string().optional(),
  timeOfTheDay: z.string().optional(),
  language: z.string().optional(),
  isFirstResponder: z.boolean().optional(),
})

type SchemaType = z.infer<typeof schema>

const CalendarFilterCard = () => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      usState: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: implement when integrating APIs
  }

  return (
    <Flex
      className="bg-white z-10 rounded-[4px] px-1.5 shadow-3"
      direction="column"
      position="sticky"
      top="0"
      mx="5"
      mt="1"
    >
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          direction="column"
          gap="1"
          wrap="wrap"
          py="1"
          className="sticky top-0"
        >
          <Flex align="center" gap="2">
            <StartDateInput />
            <StateSelect />
            <LocationDropdown />
            <ServiceDropdown />
            <ProviderDropdown />
            <VisitMediumDropdown />
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
            <Flex align="center" gap="2">
              <ProviderTypeDropdown />
              <GenderSelect />
              <TimeOfTheDayDropdown />
              <LanguageSelect />
              <FirstResponderSelect />
              <HideFiltersButton onClick={() => setIsPartialFilterView(true)} />
              <ClearFilterButton />
              <SearchButton />
            </Flex>
          )}
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { CalendarFilterCard }
