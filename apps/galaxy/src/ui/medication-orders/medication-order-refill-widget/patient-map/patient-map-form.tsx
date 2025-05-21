import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import { DateValue, I18nProvider } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
  DatePickerInput,
  DropdownSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
  SelectInput,
  TextInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import {
  getAgeFromDate,
  getCalendarDate,
  getOptionalDateString,
  getPatientDOB,
  sanitizeFormData,
} from '@/utils'
import { useStore } from '../store'
import { MedicationRefill } from '../types'

interface PatientMapFormProps {
  data: MedicationRefill
  onCloseModal: (open: boolean) => void
}
const schema = z.object({
  mrn: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().trim().optional(),
  telephone: z.string().trim().optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
})

type MapPatientSchemaType = z.infer<typeof schema>

const PatientMapForm = ({ data, onCloseModal }: PatientMapFormProps) => {
  const form = useForm<MapPatientSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {},
  })
  const { searchPatients } = useStore((state) => ({
    searchPatients: state.searchPatients,
  }))
  const options = useCodesetOptions(CODESETS.Gender)

  const onSubmit: SubmitHandler<MapPatientSchemaType> = (data) => {
    const payload = {
      ...data,
      dateOfBirth: getOptionalDateString(data.dateOfBirth),
    }
    const cleanedData = sanitizeFormData(payload)
    searchPatients(cleanedData)
  }

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    searchPatients({})
  }

  const drugs = data.drugList ?? []
  const patientLastName = data.patientLastName
  const patientFirstName = data.patientFirstName
  const patientDateOfBirth = data.patientDateOfBirth
  const patientGender = data.patientGender

  const patientName = `${patientFirstName} ${patientLastName}`
  const patientSummary = `${patientName}, ${getPatientDOB(
    patientDateOfBirth ?? '',
  )} | ${getAgeFromDate(getCalendarDate(patientDateOfBirth))} yo ${
    patientGender?.charAt(0) || ''
  }`

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex gap="2" justify="between" direction="column" className="relative">
        {drugs.map((item, index) => (
          <>
            <Flex
              key={`drugs-${item.drugDescription}`}
              gap="2"
              className="flex w-full cursor-pointer items-center justify-between px-2 py-1 text-left"
            >
              <Text size="1">
                {item.drugDescription ?? 'No Description Found'}
              </Text>
            </Flex>
            <FormFieldContainer className="flex-1">
              <FormFieldLabel>Patient Name</FormFieldLabel>
              <TextField.Root
                value={patientSummary}
                className="h-6  w-full"
                size="1"
                disabled
              />
            </FormFieldContainer>
          </>
        ))}
        <Box className="flex flex-row gap-1 rounded-b-2 rounded-t-1 px-2 py-1">
          <FormFieldContainer className=" flex-row items-center gap-1">
            <Flex gap="1">
              <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
              <TextInput
                field="firstName"
                className="w-full"
                placeHolder="Search by First Name"
              />
            </Flex>
          </FormFieldContainer>
          <FormFieldContainer className="flex-row items-center  gap-1">
            <Flex gap="1">
              <FormFieldLabel className="!text-1">Last Name</FormFieldLabel>
              <TextInput
                field="lastName"
                className="w-full"
                placeHolder="Search by Last Name"
              />
            </Flex>
          </FormFieldContainer>
          <FormFieldContainer className="flex-row items-center gap-1">
            <FormFieldLabel className="!text-1">Age</FormFieldLabel>
            <TextInput
              field="age"
              className="w-full"
              placeHolder="Search by Age"
            />
          </FormFieldContainer>
          <FormFieldContainer className="flex-row gap-1">
            <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
            <DropdownSelect field="gender" options={options} />
          </FormFieldContainer>
          <FormFieldContainer className="flex-row items-center gap-1">
            <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
            <TextInput
              field="mrn"
              className="w-full"
              placeHolder="Search by MRN"
            />
          </FormFieldContainer>
          <FormFieldContainer className="w-[200px] flex-row gap-1">
            <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
            <I18nProvider locale="en-US">
              <DatePickerInput field="dateOfBirth" yearFormat="YYYY" />
            </I18nProvider>
          </FormFieldContainer>
        </Box>
        <Box className="flex flex-row gap-1 rounded-b-2 rounded-t-1 px-2 py-1">
          <FormFieldContainer className="gap-1">
            <Flex gap="1">
              <FormFieldLabel className="!text-1">Phone No</FormFieldLabel>
              <PhoneNumberInput
                field="telephone"
                className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
                placeholder="Phone number"
              />
            </Flex>
          </FormFieldContainer>
          <Flex gap="2" justify="end">
            <Button
              color="gray"
              className="text-black w-[50px]"
              size="1"
              variant="outline"
              type="button"
              onClick={onClear}
            >
              Clear
            </Button>
            <Button highContrast size="1" type="submit" className="w-10">
              <MagnifyingGlassIcon strokeWidth={2} />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </FormContainer>
  )
}

export { PatientMapForm }
