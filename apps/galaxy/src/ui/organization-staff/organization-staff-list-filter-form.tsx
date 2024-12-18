'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
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
import { SupervisedBySelect } from './supervised-by-select'
import { StaffSearchParams } from './types'
import { VirtualWaitRoomSelect } from './virtual-wait-room-select'

const schema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  individualNpi: z.string().optional(),
  practice: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  status: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationStaffListFilterForm = () => {
  const { search, showFilters } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstname: '',
      lastname: '',
      individualNpi: '',
      practice: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      status: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
    }
    const cleanedData = sanitizeFormData(formattedData) as StaffSearchParams
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <FirstNameField />
        <LastNameField />
        <StaffTypeSelect />
        <RoleSelect />
        <CredntialsSelect />
        <SupervisedBySelect />
      </Grid>
      <Grid columns="12" gap="2" className="flex">
        <OrganizationSelect />
        <PracticeSelect />
        <IndividualNPIField />
        <StatusSelect />
        <DobField />
        <GenderSelect />
        <LanguageSelect />
      </Grid>
      <Grid columns="8" gap="2" className="flex">
        {showFilters && (
          <>
            <ProviderPreferenceSelect />
            <EmailField />
            <PhoneField />
            <VirtualWaitRoomSelect />
            <HomeAddressField />
          </>
        )}

        <FiltersToggleButton />
        <ClearButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Grid>
    </FormContainer>
  )
}

export { OrganizationStaffListFilterForm, type SchemaType }
