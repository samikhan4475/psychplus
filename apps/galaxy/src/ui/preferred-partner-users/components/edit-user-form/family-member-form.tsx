'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { Box, Button, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import {
  AddressFieldsGroup,
  DatePickerInput,
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'

interface FamilyMemberFormProps {
  googleApiKey: string
  index: number
  onRemove: (index: number) => void
}

const FamilyMemberForm = ({ googleApiKey,index, onRemove }: FamilyMemberFormProps) => {
  const form = useFormContext<EditUserSchemaType>()

  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="border-pp-grey ml-1 mr-1 mt-2 rounded-[4px] border">
        <Flex
          className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1"
          justify="between"
          gap="2"
          align="center"
        >
          <Text size="2" weight="bold" className="text-black">
            Add User
          </Text>
          <Button
            type="button"
            variant="ghost"
            size="1"
            onClick={() => onRemove(index)}
            className="!p-1"
          >
            <X size={16} />
          </Button>
        </Flex>

        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>First Name</FormFieldLabel>
              <TextField.Root
                size="1"
                placeholder="Enter first name"
                {...form.register(`familyMembers.${index}.firstName`)}
              />
              <FormFieldError name={`familyMembers.${index}.firstName`} />
            </FormFieldContainer>
          </Box>
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel>Middle Name</FormFieldLabel>
              <TextField.Root
                size="1"
                placeholder="Enter middle name"
                {...form.register(`familyMembers.${index}.middleName`)}
              />
              <FormFieldError name={`familyMembers.${index}.middleName`} />
            </FormFieldContainer>
          </Box>
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>Last Name</FormFieldLabel>
              <TextField.Root
                size="1"
                placeholder="Enter last name"
                {...form.register(`familyMembers.${index}.lastName`)}
              />
              <FormFieldError name={`familyMembers.${index}.lastName`} />
            </FormFieldContainer>
          </Box>

          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>Gender</FormFieldLabel>
              <DropdownSelect
                field={`familyMembers.${index}.gender`}
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'NotSpecified', label: 'Not Specified' },
                ]}
                placeholder="Select gender"
                buttonClassName="h-6 w-full"
                onValueChange={(value) => {
                  form.setValue(`familyMembers.${index}.gender`, value, {
                    shouldDirty: true,
                  })
                }}
              />
              <FormFieldError name={`familyMembers.${index}.gender`} />
            </FormFieldContainer>
          </Box>
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>Date of Birth</FormFieldLabel>
              <DatePickerInput
                yearFormat="YYYY"
                field={`familyMembers.${index}.dob`}
                maxValue={today(getLocalTimeZone())}
              />
              <FormFieldError name={`familyMembers.${index}.dob`} />
            </FormFieldContainer>
          </Box>
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>SSN</FormFieldLabel>
              <TextField.Root
                size="1"
                placeholder="Enter SSN"
                {...form.register(`familyMembers.${index}.ssn`)}
              />
              <FormFieldError name={`familyMembers.${index}.ssn`} />
            </FormFieldContainer>
          </Box>

          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>Phone</FormFieldLabel>
              <PhoneNumberInput
                field={`familyMembers.${index}.phone`}
                placeholder="(XXX) XXX-XXXX"
              />
              <FormFieldError name={`familyMembers.${index}.phone`} />
            </FormFieldContainer>
          </Box>
          <Box className="col-span-4">
            <FormFieldContainer className="gap-1">
              <FormFieldLabel required>Email</FormFieldLabel>
              <TextField.Root
                size="1"
                type="email"
                placeholder="Enter email"
                {...form.register(`familyMembers.${index}.email`)}
              />
              <FormFieldError name={`familyMembers.${index}.email`} />
            </FormFieldContainer>
          </Box>

          <Box className="col-span-12">
            <AddressFieldsGroup
              title="Address"
              required={true}
              prefix={`familyMembers.${index}`}
              addressFieldName="address"
              columnsPerRow="2"
            />
          </Box>
        </Grid>
      </Box>
    </GooglePlacesContextProvider>
  )
}

export { FamilyMemberForm }
