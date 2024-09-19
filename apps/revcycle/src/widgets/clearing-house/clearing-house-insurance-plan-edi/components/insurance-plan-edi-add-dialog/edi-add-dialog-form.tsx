'use client'

import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
} from '@psychplus/form'
import { Box, Flex, Switch, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { useStore } from '../../../store'
import {
  addInsurancePlanEDIRecord,
  updateInsurancePlanEDIRecord,
} from '../../api.client'
import { EdiFormSchema } from '../../schema/ediForm.schema'
import { EDIItem } from '../types'

interface EDIAddDialogFormProps {
  refresh: () => void
  selectedEDIItem: EDIItem | null
}

const EDIAddDialogForm = (props: EDIAddDialogFormProps) => {
  const { receiversOptions, insurancePayerOptions } = useStore((state) => (
    { receiversOptions: state.receiverOptions, insurancePayerOptions: state.insurancePayerOptions }
  ))

  const data = props.selectedEDIItem

  const defaultValues = {
    id: data?.id || '',
    receiverId: data?.receiverId || '',
    receiverName: data?.receiverName || '',
    insurancePayerName: data?.insurancePayerName || '',
    insurancePlanId: data?.insurancePlanId || '',
    payerId: data?.payerId || '',
    isEligibility: data?.isEligibility || false,
    isElectronic: data?.isElectronic || false,
    isInstitutional: data?.isInstitutional || false,
    isDental: data?.isDental || false,
    isPaperCms1500: data?.isPaperCms1500 || false,
    isPaperUb04: data?.isPaperUb04 || false,
  }

  const form = useForm({
    schema: EdiFormSchema,
    criteriaMode: 'all',
    defaultValues,
  })

  const onSubmit: SubmitHandler<EdiFormSchema> = async (data) => {
    try {
      const receiverName = receiversOptions.find(
        (r) => r.receiverId === data.receiverId,
      )?.receiverName
      const insurancePayerName = insurancePayerOptions.find(
        (r) => r?.insurancePlanId === data?.insurancePlanId,
      )?.insurancePayerName
      const id = data?.id ? data.id : null
      const recordStatus = 'Active'
      const submitData = {
        ...data,
        receiverName,
        id,
        recordStatus,
        insurancePayerName,
      }

      if (props.selectedEDIItem?.id) {
        await updateInsurancePlanEDIRecord(props.selectedEDIItem.id, submitData)
      } else {
        await addInsurancePlanEDIRecord(submitData)
      }
      props.refresh()
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" px="1">
        <Box className="rounded-[5px] border border-solid border-[lightgray]">
          <Flex className="bg-[#f4f9ff]" px="2" pt="1">
            <Text weight="bold">Plan Details</Text>
          </Flex>
          <Flex gap="2" my="1" p="2">
            <Box className="flex-1">
              <FormSelect
                label="Insurance Payer Name"
                placeholder="Select"
                required={true}
                {...form.register('insurancePlanId')}
                options={insurancePayerOptions?.map((r) => ({
                  label: r?.insurancePayerName,
                  value: r?.insurancePlanId,
                }))}
              />
            </Box>
            <Box className="flex-1">
              <FormTextInput
                label="Payer ID"
                required={true}
                {...form.register('payerId')}
              />
            </Box>
            <Box className="flex-1">
              <FormSelect
                label="Receiver Name"
                placeholder="Select"
                required={true}
                {...form.register('receiverId')}
                options={receiversOptions.map((r) => ({
                  label: r.receiverName,
                  value: r.receiverId,
                }))}
              />
            </Box>
          </Flex>
        </Box>

        <Box>
          <Text as="label" size="3" color="gray" mt="2">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">
                Allow electronic submission (Professional)
              </Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isElectronic') === true}
                {...form.register('isElectronic')}
                onCheckedChange={(checked) =>
                  form.setValue('isElectronic', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
        <Box>
          <Text as="label" size="3" color="gray">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">
                Allow electronic submission (Institutional)
              </Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isInstitutional') === true}
                {...form.register('isInstitutional')}
                onCheckedChange={(checked) =>
                  form.setValue('isInstitutional', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
        <Box>
          <Text as="label" size="3" color="gray">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">
                Allow electronic submission (Dental)
              </Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isDental') === true}
                {...form.register('isDental')}
                onCheckedChange={(checked) =>
                  form.setValue('isDental', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
        <Box>
          <Text as="label" size="3" color="gray">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">
                Allow paper submission (CMS-1500)
              </Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isPaperCms1500') === true}
                {...form.register('isPaperCms1500')}
                onCheckedChange={(checked) =>
                  form.setValue('isPaperCms1500', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
        <Box>
          <Text as="label" size="3" color="gray">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">
                Allow paper submission (UB04)
              </Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isPaperUb04') === true}
                {...form.register('isPaperUb04')}
                onCheckedChange={(checked) =>
                  form.setValue('isPaperUb04', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
        <Box>
          <Text as="label" size="3" color="gray">
            <Flex gap="2">
              <Text className="font-medium w-[300px]">Allow Eligibility</Text>
              <Switch
                size="1"
                defaultChecked={form.getValues('isEligibility') === true}
                {...form.register('isEligibility')}
                onCheckedChange={(checked) =>
                  form.setValue('isEligibility', checked)
                }
              />
            </Flex>
          </Text>
        </Box>
      </Flex>

      <Flex mt="3" justify="end">
        <FormSubmitButton size="2" className="bg-[#151B4A]">
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { EDIAddDialogForm }
