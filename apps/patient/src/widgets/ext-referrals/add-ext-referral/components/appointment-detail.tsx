'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormField,
  MultiSelectDropdown,
} from '@/components-v2'
import { useCodesetCodes } from '@/providers'
import { ReferralType } from '../types'
import { AppointmentTypeSelect } from './appointment-type-select'
import { DischargeDate } from './discharge-date'
import { RequestedDateInput } from './requested-date-input'
import { SchemaType } from './schema'
import { TimeSelect } from './time-select'
import { UploadDocumentButton } from './upload-document-button'
import { ZipInput } from './zip-input'
import { StateSelect } from './state-select'

interface AppointmentDetailProps {
  onFaceSheetFileChange: (file: File | undefined) => void
  onFileChange: (file: File | undefined) => void
  fileResetCounter?: number
  googleAPIkey:string
}

const AppointmentDetail = ({
  onFaceSheetFileChange,
  onFileChange,
  fileResetCounter,
  googleAPIkey
}: AppointmentDetailProps) => {
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  const form = useFormContext<SchemaType>()
  const { type: formType } = useParams<{ type: string }>()

  const servicesOfferedOptions = useMemo(
    () =>
      Array.isArray(codes)
        ? codes
            .filter(
              (c) =>
                c.value !== 'NotSet' &&
                c?.attributes?.some(
                  (a) => a?.name === 'IsUsedInReferral' && a?.value === 'True',
                ),
            )
            .map((c) => ({
              value: c.value,
              display:
                c?.attributes?.find((a) => a?.name === 'ReferralDescription')
                  ?.value ?? c.display,
            }))
        : [],
    [codes],
  )

  const sharedUploadProps = {
    resetTrigger: fileResetCounter,
    disableControls: form.formState.isSubmitting,
  }

  const secondLabel =
    formType === ReferralType.Facility ? 'Discharge Summary' : 'Medical Records'

  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="medium" className="mt-5">
        Appointment Details
      </Text>
      <Separator className="bg-pp-gray-2 w-full" />
      <Grid className="col-span-full max-xs:grid-cols-1" columns="3" gap="3">
        <Box className="col-span-full">
          <FormField
            containerClassName="flex-1"
            name="requestedServices"
            label="Reason For Referral"
          >
            <MultiSelectDropdown
              name="requestedServices"
              options={servicesOfferedOptions}
              showOptionsAtBottom
            />
          </FormField>
        </Box>

        <RequestedDateInput />
        <TimeSelect />
        <AppointmentTypeSelect />
        <Box className="max-xs:col-span-full xs:col-span-3">
          <Grid columns="2" className="max-xs:grid-cols-1" gap="3">
           
           <StateSelect googleAPIkey={googleAPIkey}/>
            <ZipInput />
            {formType === ReferralType.Facility && <DischargeDate />}
          </Grid>
        </Box>
        {formType !== ReferralType.Generic && (
          <Box className="max-xs:col-span-full xs:col-span-3">
            <Grid columns="2" className="px-2.5 max-xs:grid-cols-1" gap="6">
              <UploadDocumentButton
                label="Facesheet/Demographics"
                onFileChange={onFaceSheetFileChange}
                {...sharedUploadProps}
              />

              <UploadDocumentButton
                label={secondLabel}
                onFileChange={onFileChange}
                {...sharedUploadProps}
              />
            </Grid>
          </Box>
        )}
      </Grid>
    </Flex>
  )
}

export { AppointmentDetail }
