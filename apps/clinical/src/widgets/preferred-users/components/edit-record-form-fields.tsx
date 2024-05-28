import { useState } from 'react'
import { Box, Button, Dialog, Flex, Switch, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { z } from 'zod'
import { Form, FormSelect, FormTextInput, useForm } from '@psychplus/form'
import { PreferredPartnerPatient } from '@psychplus/preferred-partners'
import { updateWorklistUser } from '../api'
import { useStore } from '../store'

const schema = z.object({
  name: z.string().optional(),
  userStatus: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  mrn: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  pid: z.number().optional(),
  userType: z.string().optional(),
  totalUsers: z.number().optional(),
  ppUserStatus: z.string().optional(),
  startDate: z.string().optional(),
  termDate: z.string().optional(),
})

const DATE_FORMAT = 'yyyy-MM-dd'

const EditRecordFormFields = ({ data }: { data: PreferredPartnerPatient }) => {
  const { getDropdowns } = useStore()
  const [toggle, setToggle] = useState(data.isPrimaryPartner)
  const UserStatus = getDropdowns('PreferredPartnerUserStatus')
  const UserType = getDropdowns('PreferredPartnerUserType')
  UserType.map((status) => (status.value = status.label))
  UserStatus.map((status) => (status.value = status.label))
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      name: data.name,
      gender: data.gender,
      userStatus: data.userStatus,
      dob: data.dob,
      mrn: data.mrn,
      phone: data.contactDetails.phoneNumbers[0].number,
      email: data.contactDetails.email,
      address: data.contactDetails.addresses[0].street1,
      pid: data.pid,
      userType: data.userType,
      totalUsers: data.pid,
      ppUserStatus: data.name,
      startDate: format(new Date(data.addDate), DATE_FORMAT),
      termDate: format(new Date(data.termDate), DATE_FORMAT),
    },
  })

  const submitFormHandler = () => {
    console.log('FORM VALUES', form.getValues()) //phoneNumber
    // console.log({ data })
    // data.contactDetails.phone[0].number = phoneNumber

    const formFieldsData = form.getValues()
    const updateValues = {
      userType: formFieldsData.userType,
      userStatus: formFieldsData.userStatus,
      isPrimaryPartner: toggle,
      termDate: formFieldsData.termDate,
      addDate: formFieldsData.startDate,
    }

    const updatedData = { ...data, ...updateValues }

    updateWorklistUser(updatedData)
      .then(() => {
        console.log('Data updated successfully')
      })
      .catch((err) => alert(err.message))
  }

  return (
    <Form form={form} onSubmit={submitFormHandler}>
      <Flex width="100%" gap="3">
        <Box className="mb-4 flex-1">
          <FormSelect
            label="User Status"
            data-testid="patient-lookup-input-gender"
            {...form.register('userStatus')}
            options={UserStatus}
          />
        </Box>

        <Box className="mb-4 flex-1">
          <FormTextInput
            label="PP User ID"
            data-testid="patient-lookup-input-email"
            disabled={true}
            {...form.register('pid')}
          />
        </Box>

        <Box className="mb-4 flex-1">
          <FormSelect
            label="PP User Type"
            data-testid="patient-lookup-input-gender"
            {...form.register('userType')}
            options={UserType}
          />
        </Box>
      </Flex>

      <Flex width="100%" gap="3">
        <Box className="mb-4 flex-1">
          <FormTextInput
            type="date"
            label="Start Date"
            data-testid="patient-lookup-input-dateOfBirth"
            {...form.register('startDate')}
          />
        </Box>

        <Box className="mb-4 flex-1">
          <FormTextInput
            type="date"
            label="Term Date"
            {...form.register('termDate')}
          />
        </Box>
      </Flex>

      <Box>
        <Text className="pr-4 font-[700]">Preferred User</Text>

        <Switch
          color="indigo"
          onClick={() => setToggle(!toggle)}
          checked={toggle}
        />
      </Box>

      <Flex align="center" justify="end" gap="2">
        <Dialog.Close>
          <Button variant="outline" className="cursor-pointer border-[#9E9898]">
            Cancel
          </Button>
        </Dialog.Close>

        <Button color="indigo" highContrast className="cursor-pointer">
          Save
        </Button>
      </Flex>
    </Form>
  )
}

export { EditRecordFormFields }
