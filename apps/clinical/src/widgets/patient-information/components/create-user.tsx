import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { Button } from '@psychplus/ui/button'
import { FormPhoneNumberInput, FormTextInput } from '@psychplus/form'
import { useFormContext } from 'react-hook-form'
import { FORM_FIELD_CLASSES } from '../constants'
import { ChatIcon, EmailIcon } from '@/components/icons'
import { useEditModeContext } from '../context'
import { GuardianInfo } from './guardian-info'
import { requestPatientConsent } from '../api.client'

const CreateUser = () => {
  const { editable } = useEditModeContext()
  const { register, watch, setValue, unregister, getValues } = useFormContext()

  const sendEmail = () => {
    const body = {
      policyType: 'PolicyA',
      channels: ['Email'],
      toEmail: `${getValues('contactDetails.email')}`,
      cellPhoneNumber: `${getValues('contactDetails.mobileNumber.number')}`
    }
    requestPatientConsent({patientId: getValues('id'), body})
  }

  const sendSms = () => {
    const body = {
      policyType: 'PolicyA',
      channels: ['Sms'],
      toEmail: `${getValues('contactDetails.email')}`,
      cellPhoneNumber: `${getValues('contactDetails.mobileNumber.number')}`
    }
    requestPatientConsent({patientId: getValues('id'), body})
  }

  return (
    <Flex direction="column">
      <Heading size="3" className="pt-2 pb-1 pl-2 text-[14px]">
        Create User
      </Heading>
      <Grid columns='6' rows='2' className="gap-3 bg-[#FFFF] p-2">
        <FormTextInput
          label="First Name"
          {...register('legalName.firstName')}
          disabled={!editable}
          required
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Middle Name"
          disabled={!editable}
          {...register('legalName.middleName')}
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Last Name"
          disabled={!editable}
          required
          {...register('legalName.lastName')}
          className={FORM_FIELD_CLASSES}
        />
        <Flex direction="column" className="col-span-1" justify="between">
          <FormTextInput 
            type='date' 
            disabled={!editable}
            required
            className={`${FORM_FIELD_CLASSES} pr-2`}
            label='Date of Birth'  
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
          required
          {...register('contactDetails.email')}
          className={FORM_FIELD_CLASSES}
        />
        <Flex
          align="center"
          className="col-span-2 justify-between rounded-[4px] bg-[#F0F4FF] px-3 py-2 max-h-[34px] mt-auto box-border"
        >
          <Text weight="bold" className="text-[12px]">
            Guardian <span className='text-[#FF0000]'>*</span> (Do you have a Parent/Guardian?)
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
            defaultValue={watch('hasGuardian')? 'yes': 'no'}
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
                  <RadioGroup.Item
                    className="text-[#151B4A]"
                    value="no"
                  />
                  No
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </Flex>
        <GuardianInfo />
        <Flex
          align="center"
          className="col-span-2 rounded-[4px] bg-[#F0F4FF] p-2 max-h-[34px] mt-auto box-border"
        >
          <Flex gap="2" grow="1" className="font-bold text-[12px]">
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
                className="h-5 gap-x-[2px] align-center [box-shadow:none] [border-radius:2px] px-1.5 text-[10px] bg-[#0F6CBD] text-[#FFFF] font-[400] cursor-pointer"
                type='button'
                onClick={sendSms}
              >
                <ChatIcon />
                Send Sms
              </Button>
              <Button
                variant="outline"
                className="h-5 gap-x-[2px] align-center [box-shadow:none] [border-radius:2px] px-1.5 text-[10px] bg-[#0F6CBD] text-[#FFFF] font-[400] cursor-pointer"
                type='button'
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

