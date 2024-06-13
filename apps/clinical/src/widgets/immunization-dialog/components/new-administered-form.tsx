import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import { Avatar, Box, Flex, Grid, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { UserCircle2Icon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import {
  CvxCodes,
  DATE_FORMAT,
  findName,
  findOptions,
  Immunization,
  RealCodesets,
} from '@psychplus/immunization'
import {
  createImmunization,
  UpdateImmunization,
} from '@psychplus/immunization/api.client'
import { cn } from '@psychplus/ui/cn'
import { DropdownMenuSearch } from '@psychplus/ui/dropdown-menu-search'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { useToast } from '@psychplus/ui/toast-provider'
import {
  getAdministrator,
  getProviders,
  Provider,
} from '@/widgets/immunization-list/components/api'
import { useStore } from '@/widgets/immunization-list/store'
import { completionStatusCode } from '@/widgets/immunization-list/types'
import { ImmunizationSearchDropdown } from '.'

const schema = z.object({
  cvxCode: validate.requiredString,
  mvxCode: validate.requiredString,
  cvxDescription: validate.anyString,
  manufactureDescription: validate.nullableString,
  manufacturInformation: validate.nullableString,
  dose: validate.nullableString,
  units: validate.nullableString,
  ndcCode: validate.nullableString,
  lotNumber: validate.nullableString,
  FundingClass: validate.anyString,
  expirationDate: validate.anyString,
  fundingCode: validate.requiredString,
  datetimeAdministered: validate.anyString,
  providerStaffId: validate.anyString,
  completionStatusCode: validate.nullableString,
  administeringUserId: validate.nullableString,
  routeCode: validate.nullableString,
  siteCode: validate.nullableString,
})
type SchemaType = z.infer<typeof schema>

const NewAdministeredForm = ({
  closeDialog,
  data,
  isEdit = false,
}: {
  closeDialog: () => void

  isEdit?: boolean
  data?: Immunization
}) => {
  const { realCodeSets, appointmentId, immunizations, setImmunizations } =
    useStore()

  const { toast } = useToast()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      cvxCode: data?.cvxCode || '',
      mvxCode: data?.mvxCode || '',
      cvxDescription:
        findName(RealCodesets.CVX, realCodeSets[0], data?.cvxCode) || '',
      manufactureDescription:
        findName(RealCodesets.MVX, realCodeSets[0], data?.mvxCode) || '',
      manufacturInformation: data?.manufacturInformation || '',
      dose: data?.dose || '',
      units: data?.units || '',
      ndcCode: data?.ndcCode || '',
      lotNumber: data?.lotNumber || '',
      FundingClass: data?.FundingClass || '',

      expirationDate: data?.expirationDate
        ? format(new Date(data?.expirationDate), DATE_FORMAT)
        : '',

      fundingCode: data?.fundingCode || '',

      datetimeAdministered: data?.datetimeAdministered
        ? format(new Date(data?.datetimeAdministered), DATE_FORMAT)
        : format(new Date(), DATE_FORMAT),

      providerStaffId: data?.providerStaffId
        ? String(data.providerStaffId)
        : '',
      completionStatusCode: data?.completionStatusCode || '',
      administeringUserId: data?.administeringUserId
        ? String(data.administeringUserId)
        : '',
      routeCode: data?.routeCode || '',
      siteCode: data?.siteCode || '',
    },
  })

  const setFormValue = (value?: CvxCodes) => {
    form.setValue('cvxCode', value?.cvxCode || '')
    form.setValue(
      'cvxDescription',
      findName(RealCodesets.CVX, realCodeSets[0], value?.cvxCode) || '',
    )
    form.setValue('mvxCode', value?.mvxCode || '')
    form.setValue('ndcCode', value?.ndcCode || '')
    form.setValue(
      'manufactureDescription',
      findName(RealCodesets.MVX, realCodeSets[0], value?.mvxCode) || '',
    )
  }

  const clearFormValue = () => {
    form.resetField('cvxCode')
    form.resetField('cvxDescription')
    form.resetField('mvxCode')
    form.resetField('manufactureDescription')
  }

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const formData = form.getValues()

    const formattedDateAdmin = formData?.datetimeAdministered
      ? new Date(formData?.datetimeAdministered).toISOString()
      : ''

    const formattedDateExp = formData?.expirationDate
      ? new Date(formData?.expirationDate).toISOString()
      : ''

    const payload = {
      ...formData,
      administeredCode: '00',
      entryType: 'Administered',
      datetimeAdministered: formattedDateAdmin,
      expirationDate: formattedDateExp,
      appointmentId: appointmentId,
      id: isEdit ? data?.id : undefined,
    }

    const api_url = isEdit ? UpdateImmunization : createImmunization

    try {
      const res = await api_url({ payload, appointmentId })

      const updatedImmunizations: Immunization[] = immunizations.map(
        (immunization) => {
          return immunization.id === data?.id ? res : immunization
        },
      )

      isEdit
        ? setImmunizations(updatedImmunizations)
        : setImmunizations([...immunizations, res])
      toast({ type: 'success', title: isEdit ? 'Updated' : 'Created' })
      closeDialog()
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        console.error('An unknown error occurred:', err)
      }
    }
  }

  return (
    <Toast.Provider>
      <ImmunizationSearchDropdown
        setFormValue={setFormValue}
        clearFormValue={clearFormValue}
      />
      <FormContainer onSubmit={onSubmit} form={form}>
        <Grid
          columns="4"
          gap="4"
          display="inline-grid"
          mt="4"
          className="font-light"
        >
          <FormTextInput
            readOnly
            label="CVX Code"
            {...form.register('cvxCode')}
          />
          <FormTextInput
            readOnly
            label="CVX Description"
            {...form.register('cvxDescription')}
          />
          <Box className="col-span-2">
            <FormTextInput
              readOnly
              label="Manufacture Code"
              {...form.register('mvxCode')}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              readOnly
              label="Manufacture Description"
              {...form.register('manufactureDescription')}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              label="Manufacture Information"
              {...form.register('manufacturInformation')}
            />
          </Box>
          <Box className="col-span-2 grid grid-cols-3 gap-4">
            <Box className="col-span-2">
              <FormTextInput label="Dose" {...form.register('dose')} />
            </Box>
            <FormTextInput label="Unit" {...form.register('units')} />
          </Box>
          <FormTextInput
            readOnly
            label="NDC Code"
            {...form.register('ndcCode')}
          />
          <FormTextInput label="Lot Number" {...form.register('lotNumber')} />
          <Box className="col-span-2">
            <FormSelect
              label="Vaccine Funding Program Eligibility"
              data-testid="vaccine-funding-program-eligibility"
              placeholder="Select"
              {...form.register('FundingClass')}
              options={findOptions(RealCodesets.FUNDING_CLASS, realCodeSets[0])}
            />
          </Box>
          <FormTextInput
            type="date"
            label="Expiry Date"
            max="9999-12-31"
            value={form.watch('expirationDate')}
            data-testid="expiration-date"
            {...form.register('expirationDate')}
            className="mr-4"
          />
          <FormSelect
            label="Funding Source"
            data-testid="funding-code"
            placeholder="Select"
            {...form.register('fundingCode')}
            options={findOptions(
              'PHVS_ImmunizationFundingSource_IIS',
              realCodeSets[0],
            )}
          />
          <Box className="col-span-2">
            <FormSelect
              label="Completion Status"
              data-testid="completion-status"
              placeholder="Select"
              {...form.register('completionStatusCode')}
              options={completionStatusCode}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              type="date"
              label="Date Time Administered"
              max="9999-12-31"
              value={
                form.watch('datetimeAdministered') ??
                format(new Date(), DATE_FORMAT)
              }
              data-testid="datetime-administered"
              {...form.register('datetimeAdministered')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-2">
            <Flex direction="column">
              <Box>
                <FormFieldLabel id={RealCodesets.FIELD_ID}>
                  Ordering Provider
                </FormFieldLabel>
              </Box>
              <Box>
                <DropdownMenuSearch
                  disabled={false}
                  placeholder="Search providers…"
                  fetchResults={getProviders}
                  renderItem={renderItem}
                  renderTrigger={renderTrigger}
                  onChange={(value) => {
                    form.setValue('providerStaffId', value.id.toString())
                  }}
                />
              </Box>
            </Flex>
          </Box>
          <Box className="col-span-2">
            <Flex direction="column">
              <Box>
                <FormFieldLabel id={RealCodesets.FIELD_ID}>
                  Administered By
                </FormFieldLabel>
              </Box>
              <Box>
                <DropdownMenuSearch
                  disabled={false}
                  placeholder="Search administrator…"
                  fetchResults={getAdministrator}
                  renderItem={renderItem}
                  renderTrigger={renderAdminstratorTrigger}
                  onChange={(value) => {
                    form.setValue('administeringUserId', value.id.toString())
                  }}
                />
              </Box>
            </Flex>
          </Box>

          <Box className="col-span-2">
            <FormSelect
              label="Route"
              data-testid="route_code"
              placeholder="Select"
              {...form.register('routeCode')}
              options={findOptions(
                'PHVS_RouteOfAdministration_IIS',
                realCodeSets[0],
              )}
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              label="Site"
              placeholder="Select"
              data-testid="site-code"
              {...form.register('siteCode')}
              options={findOptions(
                'PHVS_AdministrativeSite_IIS',
                realCodeSets[0],
              )}
            />
          </Box>
        </Grid>
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className="text-white rounded-2 bg-[#151B4A] px-4 py-2">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

const renderProvider = (provider: Provider, disabled?: boolean | undefined) => {
  return (
    <Flex align="center" gap="3">
      <Flex>
        <Avatar
          size="1"
          radius="full"
          src={provider.avatar}
          fallback={renderAvatarFallback(provider)}
          className="h-[15px] w-[15px]"
        />
      </Flex>
      <Flex direction="column" align="start">
        <Text
          size="2"
          weight="medium"
          className={cn({ 'text-gray-8': disabled })}
        >
          {`${provider.firstName} ${provider.lastName}`}
        </Text>
        <Text size="1" color="gray" className={cn({ 'text-gray-8': disabled })}>
          {provider.honors}
        </Text>
      </Flex>
    </Flex>
  )
}

const renderItem = (provider: Provider) => {
  return (
    <Box py="2" px="2" className="hover:bg-accent-2">
      {renderProvider(provider)}
    </Box>
  )
}

const renderTrigger = (provider?: Provider) => {
  let content = null
  if (provider) {
    content = renderProvider(provider)
  } else {
    content = (
      <Flex gap="2" align="center">
        <Flex
          align="center"
          justify="center"
          className="h-[15px] w-[35px] overflow-hidden rounded-4"
        >
          <UserCircle2Icon
            strokeWidth={1}
            className="h-[85%] w-[85%] text-gray-8"
          />
        </Flex>
        <Text size="3" className="text-gray-9">
          Select provider
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      py="2"
      px="2"
      align="center"
      className="cursor-pointer rounded-item border border-gray-7 hover:bg-accent-2"
    >
      {content}
    </Flex>
  )
}

const renderAdminstratorTrigger = (provider?: Provider) => {
  let content = null
  if (provider) {
    content = renderProvider(provider)
  } else {
    content = (
      <Flex gap="2" align="center">
        <Flex
          align="center"
          justify="center"
          className="h-[15px] w-[35px] overflow-hidden rounded-4"
        >
          <UserCircle2Icon
            strokeWidth={1}
            className="h-[85%] w-[85%] text-gray-8"
          />
        </Flex>
        <Text size="3" className="text-gray-9">
          Select Administrator
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      py="2"
      px="2"
      align="center"
      className="cursor-pointer rounded-item border border-gray-7 hover:bg-accent-2"
    >
      {content}
    </Flex>
  )
}

const renderAvatarFallback = (provider: Provider) => {
  const firstInitial = provider.firstName.charAt(0)
  const lastInitial = provider.lastName.charAt(0)
  return `${firstInitial}${lastInitial}`
}

export { NewAdministeredForm }
