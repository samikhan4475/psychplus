import React, { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { StaffResource } from '@/types'
import { formatDate } from '@/utils'
import {
  createPrescriberDirectoryAction,
  disablePrescriberDirectoryAction,
  updatePrescriberDirectoryAction,
} from '../actions'
import { useLocationOptions } from '../hooks/use-location-options'
import { ServiceLevelCheckbox } from '../service-level-checkbox'
import { PrescriberPayload, StaffLocation } from '../types'
import { Grid, InfoItem, Section } from './provider-register-widgtes'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'

interface ProviderRegisterDetailProps {
  data: StaffLocation
  providerData: StaffResource | null
  loading: boolean
  onApiSuccess: () => void
}

export const ProviderRegisterDetailView = ({
  data,
  providerData,
  loading,
  onApiSuccess,
}: ProviderRegisterDetailProps) => {
  const { data: locationOptions, loading: locationLoading } =
    useLocationOptions(data.locationId)
  const serviceLevelOptions = useCodesetOptions(CODESETS.ServiceLevelType)
  const [isDisabling, setIsDisabling] = useState(false)

  const provider = useMemo(() => providerData, [providerData])
  const location = useMemo(() => locationOptions?.[0], [locationOptions])
  const phone = data.location?.phone?.number || '-'
  const fax = data.location?.fax?.number || '-'
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceLevelTypes: data.externalProviderId
        ? data.serviceLevelCodes || []
        : serviceLevelOptions?.map((option) => option.value) || [],
    },
  })

  const {
    control,
    formState: { errors },
  } = form

  const onSave = async (formData: SchemaType) => {
    const payload: PrescriberPayload = {
      serviceLevelTypes: formData.serviceLevelTypes,
    }

    const action = data.externalProviderId
      ? updatePrescriberDirectoryAction
      : createPrescriberDirectoryAction

    const result = await action({
      staffId: data.staffId,
      locationId: data.locationId,
      payload,
    })

    if (result.state === 'error') {
      toast.error(result.error)
    } else if (!result.data.isSuccessful) {
      toast.error(result.data.statusDescription)
    } else {
      toast.success(result.data.statusDescription)
      onApiSuccess()
    }
  }

  const handleDisable = async () => {
    setIsDisabling(true)

    const result = await disablePrescriberDirectoryAction({
      staffId: data.staffId,
      locationId: data.locationId,
    })

    if (result.state === 'error') {
      toast.error(result.error)
    } else if (!result.data.isSuccessful) {
      toast.error(result.data.statusDescription)
    } else {
      toast.success(result.data.statusDescription)
      onApiSuccess()
    }

    setIsDisabling(false)
  }

  if (loading || locationLoading) {
    return <LoadingPlaceholder className="bg-white min-h-[23vh]" />
  }

  return (
    <FormContainer form={form} onSubmit={onSave}>
      <Section>
        <Grid>
          <InfoItem label="First Name" value={provider?.legalName?.firstName} />
          <InfoItem label="Last Name" value={provider?.legalName?.lastName} />
          <InfoItem label="Business Name" value={data.location?.name} />
          <InfoItem label="NPI" value={provider?.npi} />
          <InfoItem label="Primary Telephone" value={phone} />
          <InfoItem label="Fax Number" value={fax} />
        </Grid>
      </Section>

      <Section>
        <Grid>
          <InfoItem
            label="Address Line 1"
            value={data?.location?.address?.street1}
          />
          <InfoItem
            label="Address Line 2"
            value={location?.address?.street2 || '-'}
          />
          <InfoItem label="City" value={location?.address?.city} />
          <InfoItem label="State" value={location?.address?.state} />
          <InfoItem
            label="Postal Code"
            value={data?.location?.address?.postalCode}
          />
        </Grid>
      </Section>
      <Section className="p-1">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight="bold" className="text-black mb-2 pb-2">
            Service Level
          </Text>
        </Box>
        <Flex
          wrap="wrap"
          gap="4"
          className="bg-white border-pp-gray-2 rounded  border p-2"
        >
          {serviceLevelOptions.map((option, idx) => (
            <ServiceLevelCheckbox
              key={option.value}
              option={option}
              control={control}
              index={idx}
            />
          ))}
          {errors.serviceLevelTypes && (
            <Text size="1" color="red">
              {errors.serviceLevelTypes.message}
            </Text>
          )}
        </Flex>
      </Section>
      {data.externalProviderId && (
        <Section>
          <Grid>
            <InfoItem label="SPI" value={data.externalProviderId} />
            <InfoItem
              label="Active Start Date"
              value={
                data.activeStartTime ? formatDate(data.activeStartTime) : '-'
              }
            />
            <InfoItem
              label="Active End Date"
              value={data.activeEndTime ? formatDate(data.activeEndTime) : '-'}
            />
          </Grid>
        </Section>
      )}

      <Flex justify="end" gap="2" className="mt-4">
        <Box className="flex-none">
          <SubmitFormButton isUpdate={!!data.externalProviderId} />
        </Box>
        {data.externalProviderId && data?.serviceLevelCodes.length > 0 && (
          <Flex justify="end" mt="3">
            <Button
              loading={isDisabling}
              onClick={handleDisable}
              className="bg-pp-black-2 text-white"
            >
              <Text size="2">Disable</Text>
            </Button>
          </Flex>
        )}
      </Flex>
    </FormContainer>
  )
}
