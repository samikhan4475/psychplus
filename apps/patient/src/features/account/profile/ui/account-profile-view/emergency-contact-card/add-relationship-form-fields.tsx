'use client'

import {
  CodesetFormSelect,
  FormField,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  PhoneNumberInput,
  ZipcodeInput
} from '@/components-v2'
import { useToast } from '@/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { CODESETS } from '@psychplus-v2/constants'
import { PhoneNumberEnum, RelationshipDefaultValuesProps } from '@psychplus-v2/types'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Box, Flex, Grid, Switch, TextFieldInput } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addRelationship } from '../../../actions/add-relationship'
import { updateRelationship } from '../../../actions/update-relationship'
import { useProfileStore } from '../../../store'

const schema = z.object({
  firstName: z.string().min(1, 'Required.').max(16, 'Max 16 characters are allowed.'),
  lastName: z.string().min(1, 'Required.').max(16, 'Max 16 characters are allowed.'),
  middleName: z.string().trim().max(16, 'Max 16 characters are allowed.').optional(),
  relationship: z.string().min(1, 'Required.'),
  address: z.string().min(1, 'Required.').max(50, 'Max 50 characters are allowed.'),
  postalCode: zipCodeSchema.min(1, 'Required.').max(5, 'Max 5 numbers are allowed'),
  email: z.string().min(1, 'Required').email('Invalid email.'),
  homePhone: z.string().min(1, 'Required.'),
  phoneNumber: z.string().min(1, 'Required.'),
})

type SchemaType = z.infer<typeof schema>

interface FormFieldsProps {
  mode: 'add' | 'edit'
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  defaultValues?: RelationshipDefaultValuesProps
}

const AddRelationshipFormFields = ({
  mode,
  open,
  setOpen,
  defaultValues,
}: FormFieldsProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const [hasEmergencyContact, setHasEmergencyContact] = useState<boolean>(
    mode === 'edit' ? defaultValues?.isEmergencyContact ?? false : false
  )
  const [hasRRI, setHasRRI] = useState<boolean>(
    mode === 'edit' ? defaultValues?.isAllowedToReleaseInformation ?? false : false
  )

  const [hasGuardian, setHasGuardian] = useState<boolean>(
    mode === 'edit' ? defaultValues?.isGuardian ?? false : false
  )

  const handleEmergencySwitchToggle = () => {
    setHasEmergencyContact(!hasEmergencyContact)
  }

  const handleRRISwitchToggle = () => {
    setHasRRI(!hasRRI)
  }

  const handleGuardianSwitchToggle = () => {
    setHasGuardian(!hasGuardian)
  }

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))


  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: defaultValues
  })

  const onSubmit = async (data: SchemaType) => {
    if (mode === 'edit' && defaultValues?.id) {
      const result = await updateRelationship(
        {
          id: defaultValues?.id,
          patientId: profile.id,
          name: {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
          },
          isEmergencyContact: hasEmergencyContact,
          isGuardian: hasGuardian,
          guardianRelationshipCode: data.relationship,
          contactDetails: {
            email: data.email,
            phoneNumbers: [
              {
                type: PhoneNumberEnum.HOME,
                number: data.homePhone
              },
              {
                type: PhoneNumberEnum.MOBILE,
                number: data.phoneNumber
              },
            ],
            addresses: [
              {
                type: "Home",
                street1: data.address,
                postalCode: data.postalCode
              }
            ],
          },
          isAllowedToReleaseInformation: hasRRI,
        }
      )

      if (result.state === 'success') {
        router.refresh()
        setOpen?.(false)
        toast({
          type: 'success',
          title: 'Relationship updated!',
        })
      }
    } else {
      const { state } = await addRelationship({
        patientId: profile.id,
        name: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        },
        isEmergencyContact: hasEmergencyContact,
        isGuardian: hasGuardian,
        guardianRelationshipCode: data.relationship,
        contactDetails: {
          email: data.email,
          phoneNumbers: [
            {
              type: PhoneNumberEnum.HOME,
              number: data.homePhone
            },
            {
              type: PhoneNumberEnum.MOBILE,
              number: data.phoneNumber
            },
          ],
          addresses: [
            {
              type: "Home",
              street1: data.address,
              postalCode: data.postalCode
            }
          ],
        },
        isAllowedToReleaseInformation: hasRRI
      })

      if (state === 'success') {
        router.refresh()
        setOpen?.(false)
        toast({
          type: 'success',
          title: 'Relationship added Successfully',
        })
      }
    }
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns={{ initial: '1', sm: '3' }} rows="4" className="w-full" gap="3">
        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>First Name</FormFieldLabel>
            <TextFieldInput
              placeholder="Enter first name"
              size="3"
              maxLength={16}
              {...form.register('firstName')}
              radius="full"
              className="font-[400]"
            />
            <FormFieldError name="firstName" />
          </FormFieldContainer>
        </Box>

        <FormFieldContainer className="w-full">
          <FormFieldLabel>Middle Name</FormFieldLabel>
          <TextFieldInput
            placeholder="Enter middle name"
            size="3"
            maxLength={16}
            {...form.register('middleName')}
            radius="full"
            className="font-[400]"
          />
          <FormFieldError name="middleName" />
        </FormFieldContainer>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Last Name</FormFieldLabel>
            <TextFieldInput
              placeholder="Enter last name"
              size="3"
              maxLength={16}
              {...form.register('lastName')}
              radius="full"
              className="font-[400]"
            />
            <FormFieldError name="lastName" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldLabel required>Relationship</FormFieldLabel>
          <FormField name="relationship" label="">
            <CodesetFormSelect
              size="3"
              name="relationship"
              codeset={CODESETS.GuardianRelationship}
            />
          </FormField>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Address</FormFieldLabel>
            <TextFieldInput
              placeholder="Enter address"
              size="3"
              maxLength={50}
              {...form.register('address')}
              radius="full"
              className="font-[400]"
            />
            <FormFieldError name="address" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Zip Code</FormFieldLabel>
            <ZipcodeInput
              className="font-[400] h-[40px]"
              {...form.register('postalCode')}
              placeholder="Enter ZIP"
              value={form.watch('postalCode')}
            />
            <FormFieldError name="postalCode" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Email Address</FormFieldLabel>
            <TextFieldInput
              placeholder="Enter email"
              size="3"
              {...form.register('email')}
              radius="full"
              className="font-[400]"
            />
            <FormFieldError name="email" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Home Phone</FormFieldLabel>
            <PhoneNumberInput
              size="3"
              {...form.register('homePhone')}
              placeholder="Enter home phone"
              classNames="font-[400]"
            />
            <FormFieldError name="homePhone" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Cell Phone</FormFieldLabel>
            <PhoneNumberInput
              placeholder="Enter phone number"
              size="3"
              {...form.register('phoneNumber')}
              classNames="font-[400]"
            />
            <FormFieldError name="phoneNumber" />
          </FormFieldContainer>
        </Box>

        <Box>
          <FormFieldContainer className="w-full">
            <Flex align="center" gap="3" justify={{ initial: 'between', sm: 'center' }}>
              <FormFieldLabel>Emergency Contact</FormFieldLabel>
              <Switch
                color="indigo"
                highContrast
                defaultChecked={hasEmergencyContact}
                onCheckedChange={handleEmergencySwitchToggle}
              />
            </Flex>
          </FormFieldContainer>
        </Box>

        <Box className="mb-0 sm:mb-3">
          <FormFieldContainer className="w-full">
            <Flex align="center" gap="3" justify={{ initial: 'between', sm: 'center' }}>
              <FormFieldLabel>RRI</FormFieldLabel>
              <Switch
                color="indigo"
                highContrast
                defaultChecked={hasRRI}
                onCheckedChange={handleRRISwitchToggle}
              />
            </Flex>
          </FormFieldContainer>
        </Box>

        <Box className="mb-0 sm:mb-3">
          <FormFieldContainer className="w-full">
            <Flex align="center" gap="3" justify={{ initial: 'between', sm: 'center' }}>
              <FormFieldLabel>Guardian</FormFieldLabel>
              <Switch
                color="indigo"
                highContrast
                defaultChecked={hasGuardian}
                onCheckedChange={handleGuardianSwitchToggle}
              />
            </Flex>
          </FormFieldContainer>
        </Box>
      </Grid>

      <Flex width="100%" justify="end" mt="3">
        <FormSubmitButton
          highContrast
          size="4"
          radius="full"
          className="min-w-[151px] font-bold"
        >
          {
            mode === 'add' ? 'Add' : "Update"
          }
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { AddRelationshipFormFields }
