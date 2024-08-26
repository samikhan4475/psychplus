import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormPhoneNumberInput, FormTextInput } from '@psychplus/form'
import { useEditModeContext } from '@psychplus/patient-info'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { ChatIcon, EmailIcon } from '@/components/icons'
import { requestPatientConsent } from '../api.client'
import { FORM_FIELD_CLASSES } from '../constants'
import { GuardianInfo } from './guardian-info'

const CreateUser = () => {
  const { editable } = useEditModeContext()
  const { register, watch, setValue, unregister, getValues } = useFormContext()

  const sendEmail = async () => {
    const body = {
      policyType: 'PolicyA',
      channels: ['Email'],
      toEmail: `${getValues('contactDetails.email')}`,
      cellPhoneNumber: `${getValues('contactDetails.mobileNumber.number')}`,
    }
    const response = await requestPatientConsent({
      patientId: getValues('id'),
      body,
    })
    if (response.failures) alert('Failed to send notification!')
    else alert('Notification sent successfully!')
  }

  const sendSms = async () => {
    const body = {
      policyType: 'PolicyA',
      channels: ['Sms'],
      toEmail: `${getValues('contactDetails.email')}`,
      cellPhoneNumber: `${getValues('contactDetails.mobileNumber.number')}`,
    }
    const response = await requestPatientConsent({
      patientId: getValues('id'),
      body,
    })
    if (response.failures) alert('Failed to send notification!')
    else alert('Notification sent successfully!')
  }

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
        Create User
      </Heading>
      <Grid columns="6" rows="2" className="gap-3 bg-[#FFFF] p-2">
        <FormTextInput
          label="First Name"
          {...register('legalName.firstName')}
          placeholder="First name"
          disabled={!editable}
          required
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Middle Name"
          placeholder="Middle name"
          disabled={!editable}
          {...register('legalName.middleName')}
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Last Name"
          placeholder="Last name"
          disabled={!editable}
          required
          {...register('legalName.lastName')}
          className={FORM_FIELD_CLASSES}
        />
        <Flex direction="column" className="col-span-1" justify="between">
          <FormTextInput
            type="date"
            disabled={!editable}
            required
            className={`${FORM_FIELD_CLASSES} pr-2`}
            label="Date of Birth"
            {...register('birthdate')}
          />
        </Flex>
        <FormPhoneNumberInput
          required
          disabled={!editable}
          label="Phone Number"
          {...register('contactDetails.mobileNumber.number')}
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Email"
          disabled={!editable}
          placeholder="Enter email"
          required
          {...register('contactDetails.email')}
          className={FORM_FIELD_CLASSES}
        />
        <Flex
          align="center"
          className="col-span-2 mt-auto box-border max-h-[34px] justify-between rounded-[4px] bg-[#F0F4FF] px-3 py-2"
        >
          <Text weight="bold" className="text-[12px]">
            Guardian <span className="text-[#FF0000]">*</span> (Do you have a
            Parent/Guardian?)
          </Text>
          <RadioGroup.Root
            size="3"
            color="indigo"
            disabled={!editable}
            highContrast
            onValueChange={(value) => {
              if (value === 'yes') {
                setValue('hasGuardian', true)
                register('guardian')
              } else {
                setValue('hasGuardian', false)
                unregister('guardian')
              }
            }}
            defaultValue={watch('hasGuardian') ? 'yes' : 'no'}
          >
            <Flex gap="3">
              <Text as="label" size="3">
                <Flex gap="1">
                  <RadioGroup.Item
                    className="text-[#151B4A]"
                    disabled={!editable}
                    value="yes"
                  />
                  Yes
                </Flex>
              </Text>
              <Text as="label" size="3">
                <Flex gap="1">
                  <RadioGroup.Item className="text-[#151B4A]" value="no" />
                  No
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </Flex>
        <GuardianInfo />
        <Flex
          align="center"
          className="col-span-2 mt-auto box-border max-h-[34px] rounded-[4px] bg-[#F0F4FF] p-2"
        >
          <Flex gap="2" flexGrow="1" className="text-[12px] font-bold">
            <Checkbox
              size="3"
              color="indigo"
              highContrast
              defaultChecked={true}
              disabled
            />
            Patient Policy A
          </Flex>
          <Flex gap="2">
            <Button
              variant="outline"
              className="align-center h-5 cursor-pointer gap-x-[2px] bg-[#0F6CBD] px-1.5 text-[10px] font-[400] text-[#FFFF] [border-radius:2px] [box-shadow:none]"
              type="button"
              onClick={sendSms}
            >
              <ChatIcon />
              Send Sms
            </Button>
            <Button
              variant="outline"
              className="align-center h-5 cursor-pointer gap-x-[2px] bg-[#0F6CBD] px-1.5 text-[10px] font-[400] text-[#FFFF] [border-radius:2px] [box-shadow:none]"
              type="button"
              onClick={sendEmail}
            >
              <EmailIcon />
              Send Email
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default CreateUser
