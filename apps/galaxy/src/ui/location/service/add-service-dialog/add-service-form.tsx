'use client'

import {
  Box,
  Grid,
  ScrollArea,
  Separator,
  Text,
  Button
} from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { DataTable, FormContainer, RadioSelectSection, AddressFieldsGroup, YesNoSelect  } from '@/components'
import {
  CosignerInput,
  CosignerTypeInput,
  LocationInfoInput,
  MaxBookingFrequencyInput,
  PlaceOfServiceInput,
  PrimaryProviderRequiredInput,
  SelectProviderInput,
  ServiceInput,
  SimilarVisitCheck,
  TexonomyInput,
  TimeDependentInput,
} from './components'
import { QuestionsData, visitData } from './data'
import { columns } from './components/columns'
import { AddServiceFormType, VisitDataType } from '../type'

const dataColumns = () => columns()

const AddServiceForm = () => {
  const form = useForm<AddServiceFormType>({})
  const handleSubmit = () => {}

  return (
    <FormContainer form={form} onSubmit={handleSubmit}>
      <Grid columns="1" gap="2">
        <Grid columns="11" gap="2">
          <LocationInfoInput />
          <ServiceInput />
          <PlaceOfServiceInput />
        </Grid>

        <Grid columns="12" gap="2">
          <TexonomyInput />
          <PrimaryProviderRequiredInput />
          <TimeDependentInput />
        </Grid>

        <Separator size={'4'} className="bg-pp-gray-2 my-3 h-px w-full" />
        <Text className="text-pp-black-3 text-[14px] font-[600] leading-5">
          Questions
        </Text>

        <Grid columns="11">
          <SelectProviderInput />
        </Grid>

        {QuestionsData.map((item) => (
          <RadioSelectSection
            key={item.name}
            label={item.label}
            field={item.name}
            options={item.options}
          />
        ))}
        <SimilarVisitCheck />

        <Separator size={'4'} className="bg-pp-gray-2 my-3 h-px w-full" />

        <Grid columns="12" gap="2">
          <MaxBookingFrequencyInput />
          <CosignerTypeInput />
          <CosignerInput />
        </Grid>

        <Grid columns="12" gap="2">
          <Text className="col-span-4">Claim Address</Text>
          <Box className="bg-pp-bg-accent col-span-8 flex gap-1 px-2">
            <Text className="mr-3 text-[12px] font-[600] leading-4">
              Is your claim address same as Primary?
            </Text>

            <YesNoSelect label='' field="isMailingAddressSameAsHome" />

          </Box>
          <Box className="col-span-12">
            <AddressFieldsGroup
              columnsPerRow="2"
            />
          </Box>
        </Grid>
        <Grid columns="1">
          <ScrollArea>
            <DataTable<(VisitDataType), ColumnDef<(VisitDataType)>>
              data={visitData}
              columns={dataColumns()}
              disablePagination
              theadClass="text-[12px] leading-4"
            />
          </ScrollArea>
        </Grid>
      </Grid>
      <Box className="mt-4 flex justify-end">
        <Button highContrast size="1" type="submit">
          Save
        </Button>
      </Box>
    </FormContainer>
  )
}

export { AddServiceForm }