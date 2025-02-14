'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDate, sanitizeFormData } from '@/utils'
import { ClearButton } from './clear-button'
import { CredntialsSelect } from './credentials-select'
import { DobField } from './dob-date-field'
import { EmailField } from './email-field'
import { FiltersToggleButton } from './filters-toggle-button'
import { FirstNameField } from './firstname-field'
import { GenderSelect } from './gender-select'
import { HomeAddressField } from './home-address-field'
import { IndividualNPIField } from './individual-npi-field'
import { LanguageSelect } from './language-select'
import { LastNameField } from './lastname-field'
import { OrganizationSelect } from './organization-select'
import { PhoneField } from './phone-field'
import { PracticeSelect } from './practice-select'
import { ProviderPreferenceSelect } from './provider-preference-select'
import { RoleSelect } from './role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { transformOut } from './utils'
import { VirtualWaitRoomField } from './virtual-wait-room-field'

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.custom<DateValue>().optional(),
  honors: z.array(z.string()).optional(),
  providerType: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  npi: z.string().optional(),
  roleCodes: z.array(z.string()).optional(),
  gender: z.string().optional(),
  spokenLanguage: z.string().optional(),
  statuses: z.array(z.string()).optional(),
  staffType: z.string().optional(),
  organizationsIds: z.array(z.string()).optional(),
  practicesIds: z.array(z.string()).optional(),
  providerAttributionCodes: z.array(z.string()).optional(),
  address1: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationStaffListFilterForm = () => {
  const { id } = useParams<{ id: string }>()
  const { search, showFilters } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      address1: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      npi: '',
      phone: '',
      email: '',
      statuses: [''],
      gender: '',
      spokenLanguage: '',
      honors: [''],
      organizationsIds: [id],
      roleCodes: [''],
      staffType: '',
      providerType: '',
      practicesIds: [''],
      providerAttributionCodes: [''],
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      isIncludeOrganizations: true,
      isIncludePractices: true,
      organizationsIds: [id],
      dateOfBirth:
        data.dateOfBirth &&
        formatDate(data.dateOfBirth.toString(), 'yyyy-MM-dd'),
    }

    const cleanedData = sanitizeFormData(formattedData)
    return search(transformOut(cleanedData), 1, true)
  }

  return (
    <FormContainer
      className="bg-white gap-2 px-2 py-3"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="6" gap="2" className="col-span-full" align="baseline">
        <FirstNameField />
        <LastNameField />
        <StaffTypeSelect />
        <RoleSelect />
        <CredntialsSelect />
        <OrganizationSelect />
      </Grid>
      <Grid columns="6" gap="2" className="col-span-full" align="baseline">
        <PracticeSelect />
        <IndividualNPIField />
        <StatusSelect />
        <DobField />
        <GenderSelect />
        <LanguageSelect />
      </Grid>
      <Grid columns="6" gap="2" className="col-span-full" align="baseline">
        {showFilters && (
          <>
            <ProviderPreferenceSelect />
            <EmailField />
            <PhoneField />
            <VirtualWaitRoomField />
            <HomeAddressField />
          </>
        )}

        <Flex>
          <FiltersToggleButton />
          <ClearButton />
          <Button highContrast size="1" type="submit">
            <MagnifyingGlassIcon strokeWidth={2} />
          </Button>
        </Flex>
      </Grid>
    </FormContainer>
  )
}

export { OrganizationStaffListFilterForm, type SchemaType }
