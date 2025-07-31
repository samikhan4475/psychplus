'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue, parseDate } from '@internationalized/date'
import { Box, Button, Dialog, Flex, Grid } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { FamilyMemberPayload, PreferredPartnerUser } from '@/types'
import { PP_USER_TYPE_OPTIONS, PP_USER_TYPES } from '../constants'
import { usePreferredPartnerStore } from '../store'
import { AddressInput } from './edit-user-form/address-input'
import { DOBInput } from './edit-user-form/dob-input'
import { EmailInput } from './edit-user-form/email-input'
import { FamilyMemberForm } from './edit-user-form/family-member-form'
import { FirstNameInput } from './edit-user-form/first-name-input'
import { GenderSelect } from './edit-user-form/gender-select'
import { LastNameInput } from './edit-user-form/last-name-input'
import { MiddleNameInput } from './edit-user-form/middle-name-input'
import { PartnerUserIDSelect } from './edit-user-form/partner-user-id-select'
import { PhoneInput } from './edit-user-form/phone-input'
import { PPUserIDInput } from './edit-user-form/pp-user-id-input'
import { PPUserStatusSelect } from './edit-user-form/pp-user-status-select'
import { PPUserTypeSelect } from './edit-user-form/pp-user-type-select'
import { SSNInput } from './edit-user-form/ssn-input'
import { StartDateInput } from './edit-user-form/start-date-input'
import { UploadStatusInput } from './edit-user-form/upload-status-input'
import { UserStatusSelect } from './edit-user-form/user-status-select'
import { UsersInIDInput } from './edit-user-form/users-in-id-input'
import {
  createEditUserSchema,
  EditUserSchemaType,
  FamilyMemberSchemaType,
} from './edit-user-schema'

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: PreferredPartnerUser
  allUsers?: PreferredPartnerUser[]
  context?: 'active' | 'worklist'
  googleApiKey: string
}

const EditUserDialog = ({
  open,
  onOpenChange,
  user,
  allUsers = [],
  context,
  googleApiKey,
}: EditUserDialogProps) => {
  const [loading, setLoading] = useState(false)
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberSchemaType[]>(
    [],
  )
  const { updateUser } = usePreferredPartnerStore()

  const form = useForm<EditUserSchemaType>({
    resolver: zodResolver(createEditUserSchema(user.userType)),
    mode: 'onChange',
    defaultValues: {
      firstName: user.name.firstName || '',
      middleName: user.name.middleName || '',
      lastName: user.name.lastName || '',
      gender: user.gender || '',
      dob: user.dob ? parseDate(user.dob) : undefined,
      ssn: user.ssn || '',
      userStatus: user.userStatus || '',
      phone: user.contactDetails.phoneNumbers?.[0]?.number || '',
      ppUserId: user.id || '',
      ppUserType: user.userType || '',
      partnerUserId: user.familyUserNumber || '',
      selectedPartnerId: '',
      ppUserStatus: user.recordStatus || '',
      startDate: user.addDate || '',
      email: user.contactDetails.email || '',
      uploadStatus: user.matchStatus || '',
      address: user.contactDetails.addresses?.[0]?.street1 || '',
      usersInId: user.numberOfUsersInGroup?.toString() || '',
      familyMembers: [],
    },
  })

  useEffect(() => {
    if (!open) {
      setFamilyMembers([])
      form.reset()
    }
  }, [open, form])

  const selectedPPUserType = form.watch('ppUserType')

  const filteredPPUserTypeOptions =
    user.userType === PP_USER_TYPES.FAMILY
      ? PP_USER_TYPE_OPTIONS.filter(
          (option) =>
            option.value === PP_USER_TYPES.INDIVIDUAL ||
            option.value === PP_USER_TYPES.FAMILY,
        )
      : PP_USER_TYPE_OPTIONS

  useEffect(() => {
    if (
      selectedPPUserType !== PP_USER_TYPES.FAMILY &&
      familyMembers.length > 0
    ) {
      setFamilyMembers([])
      form.setValue('familyMembers', [], {
        shouldValidate: false,
        shouldDirty: true,
      })
    }
  }, [selectedPPUserType, familyMembers.length, form])

  const convertFamilyMembersToPayload = (
    familyMembers: FamilyMemberSchemaType[],
  ): FamilyMemberPayload[] => {
    return familyMembers.map((member) => ({
      name: {
        firstName: member.firstName,
        middleName: member.middleName || '',
        lastName: member.lastName,
        preferredName: '',
        title: '',
        suffix: '',
        honors: '',
      },
      dateOfBirth: member.dob ? member.dob.toString() : '',
      gender: member.gender as 'NotSpecified' | 'Male' | 'Female',
      email: member.email,
      phoneNumber: member.phone,
      socialSecurityNumber: member.ssn,
      locationDetails: {
        type: 'Home',
        street1: member.address,
        street2: member.street2 || '',
        city: member.city,
        stateCode: member.state,
        countryCode: member.country || 'US',
        postalCode: member.postalCode,
        postalPlus4Code: member.postalPlus4Code || '',
        longitude: 0,
        latitude: 0,
        altitude: 0,
        timeZoneId: '',
      },
    }))
  }

  const onSubmit: SubmitHandler<EditUserSchemaType> = async (data) => {
    setLoading(true)
    try {
      if (
        user.userType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.COUPLE &&
        (!data.selectedPartnerId || data.selectedPartnerId.trim() === '')
      ) {
        toast.error('Please select a Partner User ID when choosing Couple type')
        return
      }

      if (
        user.userType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.FAMILY &&
        (!data.selectedPartnerId || data.selectedPartnerId.trim() === '')
      ) {
        toast.error('Please select a Family Member when choosing Family type')
        return
      }

      let requestedChangedEntityId: string | undefined = undefined
      let finalFamilyUserNumber = data.partnerUserId || ''

      if (
        user.userType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.COUPLE &&
        data.selectedPartnerId
      ) {
        requestedChangedEntityId = data.selectedPartnerId
      }

      if (
        user.userType === PP_USER_TYPES.INDIVIDUAL &&
        data.ppUserType === PP_USER_TYPES.FAMILY &&
        data.selectedPartnerId
      ) {
        const selectedFamilyUser = allUsers.find(
          (u) => u.id === data.selectedPartnerId,
        )
        if (selectedFamilyUser) {
          finalFamilyUserNumber = selectedFamilyUser.familyUserNumber || ''
        }
      }

      const updatedUser: PreferredPartnerUser = {
        ...user,
        name: {
          ...user.name,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        },
        gender: data.gender as 'NotSpecified' | 'Male' | 'Female',
        dob: data.dob ? data.dob.toString() : '',
        ssn: data.ssn ?? '',
        userStatus: data.userStatus as 'Primary' | 'Secondary',
        contactDetails: {
          ...user.contactDetails,
          phoneNumbers: [
            {
              ...user.contactDetails.phoneNumbers?.[0],
              number: data.phone ?? '',
            },
          ],
          email: data.email ?? '',
          addresses: [
            {
              ...user.contactDetails.addresses?.[0],
              street1: data.address ?? '',
            },
          ],
        },
        userType: data.ppUserType as 'Individual' | 'Couple' | 'Family',
        familyUserNumber: finalFamilyUserNumber,
        recordStatus: data.ppUserStatus as 'Active' | 'Deleted',
        addDate: data.startDate ?? '',
        matchStatus: data.uploadStatus as
          | 'New'
          | 'Matched'
          | 'Unmatched'
          | 'Reconcile',
        numberOfUsersInGroup: parseInt(data.usersInId || '0', 10),
      }

      const newFamilyMembers =
        data.familyMembers && data.familyMembers.length > 0
          ? convertFamilyMembersToPayload(data.familyMembers)
          : []

      await updateUser(
        user.partnerId,
        user.id,
        updatedUser,
        newFamilyMembers,
        newFamilyMembers.length > 0,
        requestedChangedEntityId,
        context,
      )

      toast.success('User updated successfully')
      onOpenChange(false)
    } catch {
      toast.error('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-4xl rounded-1 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>

        <Dialog.Title size="6" className="mb-6 font-[600]">
          Edit User
        </Dialog.Title>

        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <Grid columns="4" gap="4">
              <FirstNameInput disabled />
              <MiddleNameInput disabled />
              <LastNameInput disabled />
              <GenderSelect disabled />
            </Grid>

            <Grid columns="4" gap="4">
              <DOBInput disabled />
              <SSNInput disabled />
              <UserStatusSelect disabled />
              <PhoneInput disabled />
            </Grid>

            <Grid
              columns={
                selectedPPUserType === PP_USER_TYPES.INDIVIDUAL ||
                user.userType === PP_USER_TYPES.FAMILY ||
                (user.userType === PP_USER_TYPES.COUPLE &&
                  selectedPPUserType === PP_USER_TYPES.COUPLE) ||
                (user.userType === PP_USER_TYPES.COUPLE &&
                  selectedPPUserType === PP_USER_TYPES.FAMILY)
                  ? '3'
                  : '4'
              }
              gap="4"
            >
              <PPUserIDInput disabled />
              <PPUserTypeSelect options={filteredPPUserTypeOptions} />
              {user.userType === PP_USER_TYPES.INDIVIDUAL &&
                selectedPPUserType === PP_USER_TYPES.COUPLE && (
                  <PartnerUserIDSelect
                    allUsers={allUsers}
                    currentUserId={user.id}
                  />
                )}
              {user.userType === PP_USER_TYPES.INDIVIDUAL &&
                selectedPPUserType === PP_USER_TYPES.FAMILY && (
                  <PartnerUserIDSelect
                    allUsers={allUsers}
                    currentUserId={user.id}
                  />
                )}
              <UsersInIDInput disabled />
            </Grid>

            <Grid columns="4" gap="4">
              <PPUserStatusSelect disabled />
              <StartDateInput disabled />
              <EmailInput disabled />
              <UploadStatusInput disabled />
            </Grid>

            <AddressInput disabled />

            {familyMembers.length > 0 && (
              <Box>
                {familyMembers.map((member, index) => (
                  <FamilyMemberForm
                    key={`family-member-${index}`}
                    index={index}
                    googleApiKey={googleApiKey}
                    onRemove={(removeIndex) => {
                      const currentFamilyMembers =
                        (form.getValues(
                          'familyMembers',
                        ) as FamilyMemberSchemaType[]) || []
                      const updatedFamilyMembers = currentFamilyMembers.filter(
                        (_, i) => i !== removeIndex,
                      )
                      setFamilyMembers(updatedFamilyMembers)
                      form.setValue('familyMembers', updatedFamilyMembers, {
                        shouldValidate: false,
                        shouldDirty: true,
                      })
                    }}
                  />
                ))}
              </Box>
            )}

            {selectedPPUserType === PP_USER_TYPES.FAMILY &&
              (user.userType === PP_USER_TYPES.FAMILY ||
                user.userType === PP_USER_TYPES.COUPLE) && (
                <Flex justify="start" mt="4">
                  <Button
                    type="button"
                    variant="outline"
                    color="gray"
                    onClick={() => {
                      const currentFamilyMembers =
                        (form.getValues(
                          'familyMembers',
                        ) as FamilyMemberSchemaType[]) || []

                      const newFamilyMember: FamilyMemberSchemaType = {
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        gender: '',
                        dob: null as unknown as DateValue,
                        ssn: '',
                        phone: '',
                        email: '',
                        address: '',
                        street2: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        postalPlus4Code: '',
                        country: 'US',
                      }

                      const updatedFamilyMembers = [
                        ...currentFamilyMembers,
                        newFamilyMember,
                      ]

                      setFamilyMembers(updatedFamilyMembers)
                      form.setValue('familyMembers', updatedFamilyMembers, {
                        shouldValidate: false,
                        shouldDirty: true,
                      })
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Members to Family
                  </Button>
                </Flex>
              )}

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="solid" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Flex>
          </Flex>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditUserDialog }
