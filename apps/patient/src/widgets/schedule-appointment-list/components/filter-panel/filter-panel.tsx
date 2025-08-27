'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { addDays, format, getMonth, getYear } from 'date-fns'
import DatePicker from 'react-datepicker'
import { TextField } from '@psychplus/ui/text-field'
import { SyncedPillToggleGroup } from '@/components-v2/pill-toggle-group'
import {
  SERVICE_TYPE_OPTIONS,
  SORT_OPTIONS,
  SORT_TYPES,
  VISIT_TYPE_OPTIONS,
  VISIT_TYPES,
} from '@/constants/appointment'
import { mapCodesetToOptions, useCodesetCodes } from '@/providers'
import CustomDateInput from '@/widgets/schedule-appointment-dialog/forms/new-patient/custom-date-input'
import { useStore } from '../../store'
import { FilterOption, type Filters } from '../../types'
import { FilterOptionsSelect } from '../filter-options-select'
import { FilterItem } from '../filter-panel-item'
import 'react-datepicker/dist/react-datepicker.css'
import { isMobile } from '@psychplus/utils/client'
import { useToast } from '@/providers'
import {
  getCodsetValue,
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  getValidStartDate,
  months,
  years,
} from '../../utils'

interface FilterPanelProps {
  stateOptions?: FilterOption[]
  isSchedulingOptimizationEnabled?: boolean
}

const FilterPanel = ({ stateOptions = [] }: FilterPanelProps) => {
  const languageCodeSet = useCodesetCodes(CODESETS.Language)
  const { toast } = useToast()
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const LANGUAGE_OPTIONS = mapCodesetToOptions(languageCodeSet)
  const {
    handleFiltersChange,
    filters,
    searchLocationsProviders,
    setDefaultDate,
    defaultDate,
  } = useStore()

  const [filtersState, setFiltersState] = useState<Filters>(filters)

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const handleZipCodeChange = (value: string) => {
    const zipCode = value.slice(0, 5)
    handleFiltersChange({ zipCode })
  }

  const SORT_OPTIONS_TRANSFORMED = useMemo(() => {
    return SORT_OPTIONS.map((item) => ({
      ...item,
      disabled:
        item.value === SORT_TYPES.MILEAGE &&
        filtersState.appointmentType === VISIT_TYPES.VIRTUAL,
    }))
  }, [filtersState.appointmentType])

  const handleSortByChange = (data: Partial<Filters>) => {
    if (data.sortBy === SORT_TYPES.BEST_OPTION) {
      searchLocationsProviders(
        {
          zipCode: filtersState.zipCode,
          appointmentType: getNormalizedAppointmentType(
            filtersState.appointmentType,
          ),
          state: filtersState.state,
          startingDate: isMobile()
            ? getValidStartDate(filtersState.startingDate)
            : filtersState.startingDate,
          providerType: getNormalizedProviderType(filtersState.providerType),
          stateCode: getCodsetValue(stateCodes, filtersState?.state ?? ''),
        },
        toast,
      )
    }
    handleFiltersChange(data)
  }

  return (
    <Flex className="sticky top-0 z-10 h-auto w-full flex-col">
      <Flex
        align="center"
        className="bg-white border-b-pp-gray-4 sticky top-0 z-10 h-[60px] w-full justify-center border-b-[2px]"
      >
        <Text className="text-pp-blue-3 text-[14px] font-bold lg:text-[28px]">
          Schedule appointment
        </Text>
      </Flex>
      <Flex className=" sticky top-0 z-10  w-full">
        <Flex
          gap="4"
          align="center"
          className="bg-white border-b-pp-gray-4 mx-7 h-[100px] w-full flex-wrap border-b-[1px] py-1"
        >
          <FilterItem label="Appointment" className="w-[200px]">
            <FilterOptionsSelect
              prefix="provider"
              filterType="providerType"
              options={SERVICE_TYPE_OPTIONS}
              onFilterChange={handleFiltersChange}
              placeholder="provider"
              selectedOption={filtersState?.providerType}
            />
          </FilterItem>

          <FilterItem label="Virtual / In-Person" className="w-[250px] ">
            <SyncedPillToggleGroup
              options={VISIT_TYPE_OPTIONS}
              value={filtersState.appointmentType}
              onChange={(val) => handleFiltersChange({ appointmentType: val })}
              delay={1}
            />
          </FilterItem>

          <FilterItem label="Date" className=" w-[130px] ">
            <DatePicker
              customInput={<CustomDateInput />}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={new Date()}
              maxDate={addDays(new Date(), 180)}
              selected={defaultDate}
              onChange={(date) => {
                if (date) {
                  setDefaultDate(new Date(date))
                  handleFiltersChange({
                    startingDate: format(new Date(date), 'yyyy-MM-dd'),
                  })
                }
              }}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <Flex align={'center'} justify={'center'} gap="1">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {'<'}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) =>
                      changeYear(value as unknown as number)
                    }
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {'>'}
                  </button>
                </Flex>
              )}
            />
          </FilterItem>

          <FilterItem label="Language" className="w-[140px]">
            <FilterOptionsSelect
              prefix="Language"
              filterType="language"
              options={LANGUAGE_OPTIONS}
              onFilterChange={handleFiltersChange}
              placeholder="Language"
              selectedOption={filters.language}
            />
          </FilterItem>

          <FilterItem label="ZIP Code" className="w-[125px] ">
            <TextField.Root
              radius="full"
              size="3"
              type="number"
              variant="soft"
              color="gray"
              placeholder="Zip code"
              autoComplete="off"
              value={filtersState?.zipCode}
              className="bg-white border-pp-gray-4 text-pp-text-color w-full whitespace-nowrap border px-1 py-3 text-[14px] font-regular max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px] lg:h-10"
              onChange={(e) => handleZipCodeChange(e.target.value)}
            />
          </FilterItem>

          <FilterItem label="Residing State" className="w-[130px] ">
            <FilterOptionsSelect
              filterType="state"
              disabled={stateOptions.length < 2}
              options={stateOptions}
              onFilterChange={handleFiltersChange}
              placeholder="State"
              selectedOption={filtersState?.state}
            />
          </FilterItem>

          <FilterItem label="Sort by" className="w-[125px]">
            <FilterOptionsSelect
              filterType="sortBy"
              options={SORT_OPTIONS_TRANSFORMED}
              onFilterChange={handleSortByChange}
              placeholder="Sort By"
              selectedOption={filters.sortBy}
              defaultValue={SORT_TYPES.BEST_OPTION}
            />
          </FilterItem>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { FilterPanel }
