import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AddressFieldsGroup, FormContainer } from '@/components'
import { NewPatient, Policy } from '@/types'
import {
  sendPolicyEmailAction,
  sendPolicySmsAction,
} from '@/ui/patient-info/patient-info-tab/actions'
import { addPatient } from '../actions/add-patient'
import { schema, SchemaType } from '../schema'
import { PatientBody } from '../types'
import { DobInput } from './dob-input'
import { EmailInput } from './email-input'
import { FirstNameInput } from './first-name-text'
import { GenderSelect } from './gender-select'
import { GuardianFirstNameInput } from './guardian-first-name-input'
import { GuardianLastNameInput } from './guardian-last-name-input'
import { GuardianRadio } from './guardian-radio'
import { LastNameInput } from './last-name-text'
import { MailingAddressRadio } from './mailing-address-radio'
import { MiddleNameInput } from './middle-name-text'
import { PhoneNumberInput } from './phone-number-text'
import { PolicySection } from './policy-section'
import { RelationshipSelect } from './relationship-select'

const AddPatientForm = ({
  onPatientAdd,
}: {
  onPatientAdd: (data: NewPatient) => void
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const newPatientRef = useRef<NewPatient | undefined>(undefined)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      legalName: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      gender: '',
      dateOfBirth: undefined,
      phoneNumber: '',
      email: '',
      guardianFirstName: '',
      guardianLastName: '',
      hasGuardian: 'no',
      contactInfo: {
        addresses: [
          {
            type: 'Home',
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
          },
          {
            type: 'Mailing',
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
          },
        ],
        isMailingAddressSameAsPrimary: 'yes',
      },
    },
  })
  const hasGuardian = form.watch('hasGuardian')
  const phone = form.watch('phoneNumber')
  const email = form.watch('email')
  const isMailingAddressSameAsPrimary = form.watch(
    'contactInfo.isMailingAddressSameAsPrimary',
  )

  const createPatient = async (
    data: SchemaType,
  ): Promise<NewPatient | undefined> => {
    try {
      const body: PatientBody = {
        legalName: {
          firstName: data.legalName.firstName,
          middleName: data.legalName.middleName,
          lastName: data.legalName.lastName,
        },
        dateOfBirth: data.dateOfBirth.toString(),
        gender: data.gender,
        contactInfo: {
          email: data.email,
          addresses:
            data.contactInfo.isMailingAddressSameAsPrimary === 'yes'
              ? data.contactInfo.addresses.filter(
                  (address) => address.type !== 'Mailing',
                )
              : data.contactInfo.addresses,
          isMailingAddressSameAsPrimary:
            data.contactInfo.isMailingAddressSameAsPrimary === 'yes',
          phoneNumbers: [
            {
              type: 'Home',
              number: data.phoneNumber,
            },
          ],
        },
        password: '',
      }
      if (!data.contactInfo.addresses[0].street1) {
        delete body.contactInfo.addresses
      }
      if (hasGuardian === 'yes') {
        body.guardian = {
          name: {
            firstName: data.guardianFirstName,
            lastName: data.guardianLastName,
          },
          relationship: data.relationship,
        }
      }
      const res = await addPatient(body)

      if (res.state === 'error') {
        toast.error(res.error)
        return
      }
      newPatientRef.current = res.data
      toast.success('Patient Saved successfully')

      return res.data
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    }
  }

  const sendSMS = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    setIsLoading(true)

    let resData
    if (newPatientRef.current) {
      resData = newPatientRef.current
    } else {
      resData = await createPatient(form.getValues())
    }
    if (!resData?.accessToken) return setIsLoading(false)

    const sendPolicySMS = async (policy: Policy) => {
      const result = await sendPolicySmsAction(
        resData.accessToken,
        phone,
        policy,
      )
      if (result.state === 'error') {
        toast.error(`Failed to send text for ${policy}`)
        return false
      }
      return true
    }

    const policies = [
      { field: 'patientPolicyA', policy: Policy.PolicyA },
      { field: 'patientPolicyB', policy: Policy.PolicyB },
    ]

    for (const { field, policy } of policies) {
      if (form.getValues(field as keyof SchemaType)) {
        const success = await sendPolicySMS(policy)
        if (!success) {
          return setIsLoading(false)
        }
      }
    }
    setIsLoading(false)
    onPatientAddSuccess(resData)
    newPatientRef.current = undefined
    toast.success('Text sent!')
    form.reset()
  }

  const sendEmail = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    setIsLoading(true)

    let resData
    if (newPatientRef.current) {
      resData = newPatientRef.current
    } else {
      resData = await createPatient(form.getValues())
    }
    if (!resData?.accessToken) return setIsLoading(false)

    const sendPolicyEmail = async (policy: Policy) => {
      const result = await sendPolicyEmailAction(
        resData.accessToken,
        email,
        policy,
      )
      if (result.state === 'error') {
        toast.error(`Failed to send email for ${policy}`)
        return false
      }
      return true
    }

    const policies = [
      { field: 'patientPolicyA', policy: Policy.PolicyA },
      { field: 'patientPolicyB', policy: Policy.PolicyB },
    ]

    for (const { field, policy } of policies) {
      if (form.getValues(field as keyof SchemaType)) {
        const success = await sendPolicyEmail(policy)
        if (!success) {
          return setIsLoading(false)
        }
      }
    }
    setIsLoading(false)
    onPatientAddSuccess(resData)
    newPatientRef.current = undefined
    toast.success('Email sent!')
    form.reset()
  }

  const onPatientAddSuccess = (resData: NewPatient) => {
    const data = form.getValues()
    onPatientAdd({
      ...resData,
      dob: data.dateOfBirth.toString(),
      gender: data.gender,
    })
  }

  const onSave = async (data: SchemaType) => {
    setIsLoading(true)
    const resData = await createPatient(data)
    setIsLoading(false)
    if (!resData?.accessToken) return
    onPatientAddSuccess(resData)
    form.reset()
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Personal Details
          </Text>
        </Box>

        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-3">
            <FirstNameInput />
          </Box>
          <Box className="col-span-3">
            <MiddleNameInput />
          </Box>
          <Box className="col-span-3">
            <LastNameInput />
          </Box>
          <Box className="col-span-3">
            <GenderSelect />
          </Box>
          <Box className="col-span-4">
            <DobInput />
          </Box>
          <Box className="col-span-4">
            <PhoneNumberInput />
          </Box>
          <Box className="col-span-4">
            <EmailInput />
          </Box>
        </Grid>
      </Box>

      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Parent/Guardian
          </Text>
        </Box>
        <Grid columns="12" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <Box className="col-span-12">
            <GuardianRadio />
          </Box>
          {hasGuardian === 'yes' && (
            <>
              <Box className="col-span-4">
                <GuardianFirstNameInput />
              </Box>
              <Box className="col-span-4">
                <GuardianLastNameInput />
              </Box>
              <Box className="col-span-4">
                <RelationshipSelect />
              </Box>
            </>
          )}
          <Box className="col-span-12">
            <PolicySection
              sendEmail={form.handleSubmit(sendEmail)}
              sendSMS={form.handleSubmit(sendSMS)}
              isLoading={isLoading}
            />
          </Box>
        </Grid>
      </Box>

      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Address
          </Text>
        </Box>

        <Grid className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <AddressFieldsGroup
            columnsPerRow="2"
            prefix="contactInfo.addresses[0]"
            addressFieldName="street1"
            required={false}
          />
        </Grid>
        <Grid className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <MailingAddressRadio />
        </Grid>
        {isMailingAddressSameAsPrimary === 'no' && (
          <Grid className="mb-2 mt-2 gap-3 pl-2 pr-2">
            <AddressFieldsGroup
              columnsPerRow="2"
              prefix="contactInfo.addresses[1]"
              addressFieldName="street1"
              required={false}
            />
          </Grid>
        )}
      </Box>
      <Box className="mt-4 flex justify-end">
        <Button
          loading={isLoading}
          className="bg-pp-black-2 text-white"
          onClick={form.handleSubmit(onSave)}
          disabled={!!newPatientRef.current}
        >
          <Text size="2">Save</Text>
        </Button>
      </Box>
    </FormContainer>
  )
}

export { AddPatientForm }
